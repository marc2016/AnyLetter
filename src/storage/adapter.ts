import { BaseDirectory, join } from '@tauri-apps/api/path';
import { exists, mkdir, readTextFile, writeTextFile, readDir, remove } from '@tauri-apps/plugin-fs';
import { Draft } from '../models/draft';
import { normalizeDraftFromStorage } from '../utils/letterDraftMapping';
import { Folder } from '../models/Folder';

const DRAFTS_DIR = 'drafts';
const FOLDERS_DIR = 'folders';

export async function initStorage() {
  const draftsExists = await exists(DRAFTS_DIR, { baseDir: BaseDirectory.AppData });
  if (!draftsExists) {
    await mkdir(DRAFTS_DIR, { baseDir: BaseDirectory.AppData, recursive: true });
  }
  const foldersExists = await exists(FOLDERS_DIR, { baseDir: BaseDirectory.AppData });
  if (!foldersExists) {
    await mkdir(FOLDERS_DIR, { baseDir: BaseDirectory.AppData, recursive: true });
  }
}

export async function saveDraftFile(draft: Draft): Promise<void> {
  await initStorage();
  const filePath = await join(DRAFTS_DIR, `${draft.id}.json`);
  const data = JSON.stringify({ ...draft, schemaVersion: 1 }, null, 2);
  
  await writeTextFile(filePath, data, { baseDir: BaseDirectory.AppData });
}

export async function deleteDraftFile(id: string): Promise<void> {
  const filePath = await join(DRAFTS_DIR, `${id}.json`);
  const fileExists = await exists(filePath, { baseDir: BaseDirectory.AppData });
  if (fileExists) {
    await remove(filePath, { baseDir: BaseDirectory.AppData });
  }
}

export async function saveFolderFile(folder: Folder): Promise<void> {
  await initStorage();
  const filePath = await join(FOLDERS_DIR, `${folder.id}.json`);
  const data = JSON.stringify({ ...folder, schemaVersion: 1 }, null, 2);
  await writeTextFile(filePath, data, { baseDir: BaseDirectory.AppData });
}

export async function deleteFolderFile(id: string): Promise<void> {
  const filePath = await join(FOLDERS_DIR, `${id}.json`);
  const fileExists = await exists(filePath, { baseDir: BaseDirectory.AppData });
  if (fileExists) {
    await remove(filePath, { baseDir: BaseDirectory.AppData });
  }
}

export async function loadAllDrafts(): Promise<Draft[]> {
  await initStorage();
  const entries = await readDir(DRAFTS_DIR, { baseDir: BaseDirectory.AppData });
  const drafts: Draft[] = [];

  for (const entry of entries) {
    if (entry.name && entry.name.endsWith('.json')) {
      try {
        const filePath = await join(DRAFTS_DIR, entry.name);
        let contents = "";
        try {
          contents = await readTextFile(filePath, { baseDir: BaseDirectory.AppData });
          const data = JSON.parse(contents);
          const draft = normalizeDraftFromStorage(data);

          if (draft) {
            drafts.push(draft);
          } else {
            throw new Error("Missing required schema fields");
          }
        } catch (parseErr) {
          console.error(`Invalid draft data in ${entry.name}, quarantining...`, parseErr);
          const backupPath = await join(DRAFTS_DIR, `${entry.name}.bak`);
          await writeTextFile(backupPath, contents, { baseDir: BaseDirectory.AppData });
          await remove(filePath, { baseDir: BaseDirectory.AppData });
        }
      } catch (err) {
        console.error(`Failed to process draft file ${entry.name}`, err);
      }
    }
  }

  return drafts;
}

export async function loadAllFolders(): Promise<Folder[]> {
  await initStorage();
  const entries = await readDir(FOLDERS_DIR, { baseDir: BaseDirectory.AppData });
  const folders: Folder[] = [];

  for (const entry of entries) {
    if (entry.name && entry.name.endsWith('.json')) {
      try {
        const filePath = await join(FOLDERS_DIR, entry.name);
        const contents = await readTextFile(filePath, { baseDir: BaseDirectory.AppData });
        const data = JSON.parse(contents);
        
        if (data.id && data.name) {
          folders.push({
            id: data.id,
            name: data.name,
            parentId: data.parentId || null,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt || data.createdAt
          });
        }
      } catch (err) {
        console.error(`Failed to process folder file ${entry.name}`, err);
      }
    }
  }

  return folders;
}

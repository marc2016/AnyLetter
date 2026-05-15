import { BaseDirectory, join } from '@tauri-apps/api/path';
import { exists, mkdir, readTextFile, writeTextFile, readDir, remove } from '@tauri-apps/plugin-fs';
import { Draft } from '../models/draft';

const DRAFTS_DIR = 'drafts';

export async function initStorage() {
  const dirExists = await exists(DRAFTS_DIR, { baseDir: BaseDirectory.AppData });
  if (!dirExists) {
    await mkdir(DRAFTS_DIR, { baseDir: BaseDirectory.AppData, recursive: true });
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
          
          if (data.id && data.createdAt) {
            drafts.push({
              id: data.id,
              recipient: data.recipient || '',
              subject: data.subject || '',
              body: data.body || '',
              createdAt: data.createdAt,
              updatedAt: data.updatedAt || data.createdAt
            });
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

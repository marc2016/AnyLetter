import { render, screen, waitFor, cleanup } from '@testing-library/react';
import { act } from 'react';
import { DraftProvider, useDrafts } from './context/DraftContext';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});

// Mocks for Tauri plugins
vi.mock('@tauri-apps/api/path', () => ({
  BaseDirectory: { AppData: 1 },
  appDataDir: vi.fn().mockResolvedValue('/mock/appdata'),
  join: vi.fn(async (...args) => args.join('/')),
}));

vi.mock('@tauri-apps/api/window', () => ({
  getCurrentWindow: vi.fn().mockReturnValue({
    onCloseRequested: vi.fn().mockResolvedValue(() => {}),
    destroy: vi.fn(),
    minimize: vi.fn(),
    toggleMaximize: vi.fn(),
    close: vi.fn(),
    startDragging: vi.fn(),
  }),
}));

const mockFiles: Record<string, string> = {};

vi.mock('@tauri-apps/plugin-fs', () => ({
  exists: vi.fn(async (path: string) => path in mockFiles || path === 'drafts'),
  mkdir: vi.fn(async () => {}),
  readDir: vi.fn(async (path: string) => {
    if (path === 'drafts') {
      return Object.keys(mockFiles)
        .filter(k => k.startsWith('drafts/'))
        .map(name => ({ name: name.replace('drafts/', '') }));
    }
    return [];
  }),
  readTextFile: vi.fn(async (path: string) => mockFiles[path] || ''),
  writeTextFile: vi.fn(async (path: string, data: string) => { mockFiles[path] = data; }),
  remove: vi.fn(async (path: string) => { delete mockFiles[path]; }),
}));

function TestComponent() {
  const { drafts, addDraft, updateDraft, deleteDraft, isLoading } = useDrafts();
  
  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div data-testid="count">{drafts.length}</div>
      <button onClick={() => addDraft({ id: '1', parentId: null, recipient: 'Alice', subject: 'Hello', content: 'World', sender: '', notes: '', info: '', date: null, footer: '', createdAt: 1, updatedAt: 1 })}>Add</button>
      <button onClick={() => updateDraft('1', { subject: 'Updated' })}>Update</button>
      <button onClick={() => deleteDraft('1')}>Delete</button>
    </div>
  );
}

describe('DraftContext Integration', () => {
  beforeEach(() => {
    for (const key of Object.keys(mockFiles)) delete mockFiles[key];
  });

  it('handles create, edit, delete scenarios', async () => {
    render(<DraftProvider><TestComponent /></DraftProvider>);
    
    expect(screen.getByText('Loading...')).toBeDefined();
    await waitFor(() => expect(screen.getByTestId('count').textContent).toBe('0'));

    act(() => { screen.getByText('Add').click(); });
    expect(screen.getByTestId('count').textContent).toBe('1');
    
    await waitFor(() => {
      expect(mockFiles['drafts/1.json']).toBeDefined();
    });

    act(() => { screen.getByText('Update').click(); });
    
    await waitFor(() => {
      expect(JSON.parse(mockFiles['drafts/1.json']).subject).toBe('Updated');
    }, { timeout: 3500 });

    act(() => { screen.getByText('Delete').click(); });
    expect(screen.getByTestId('count').textContent).toBe('0');
    
    await waitFor(() => {
      expect(mockFiles['drafts/1.json']).toBeUndefined();
    });
  });

  it('handles invalid-storage scenarios gracefully', async () => {
    mockFiles['drafts/valid.json'] = JSON.stringify({ id: 'valid', createdAt: 1, subject: 'Valid' });
    mockFiles['drafts/invalid.json'] = '{ bad json }';
    
    render(<DraftProvider><TestComponent /></DraftProvider>);
    
    await waitFor(() => expect(screen.getByTestId('count').textContent).toBe('1'));
    
    expect(mockFiles['drafts/invalid.json.bak']).toBe('{ bad json }');
    expect(mockFiles['drafts/invalid.json']).toBeUndefined();
  });
});

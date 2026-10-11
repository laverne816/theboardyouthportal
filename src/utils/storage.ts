import { ApplicationTrackItem, ApplicationStatus } from '../types';

const STORAGE_KEYS = {
  PINNED: 'the_board_pinned_ids',
  APPLICATIONS: 'the_board_applications',
  RECENTLY_VIEWED: 'the_board_recently_viewed',
  CHECKLISTS: 'the_board_checklists'
};

export const getPinnedIds = (): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PINNED);
    return raw ? JSON.parse(raw) : ['opp-1', 'opp-3'];
  } catch {
    return ['opp-1', 'opp-3'];
  }
};

export const togglePinId = (id: string): { isPinned: boolean; count: number } => {
  const current = getPinnedIds();
  const exists = current.includes(id);
  const updated = exists ? current.filter(item => item !== id) : [...current, id];
  try {
    localStorage.setItem(STORAGE_KEYS.PINNED, JSON.stringify(updated));
  } catch {
    // Ignore
  }
  return { isPinned: !exists, count: updated.length };
};

export const isOpportunityPinned = (id: string): boolean => {
  return getPinnedIds().includes(id);
};

export const getRecentlyViewedIds = (): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RECENTLY_VIEWED);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const addRecentlyViewedId = (id: string): void => {
  const current = getRecentlyViewedIds().filter(x => x !== id);
  const updated = [id, ...current].slice(0, 8);
  try {
    localStorage.setItem(STORAGE_KEYS.RECENTLY_VIEWED, JSON.stringify(updated));
  } catch {
    // Ignore
  }
};

export const getChecklistState = (oppId: string): { [key: string]: boolean } => {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(`${STORAGE_KEYS.CHECKLISTS}_${oppId}`);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export const toggleChecklistItem = (oppId: string, itemKey: string): { [key: string]: boolean } => {
  const current = getChecklistState(oppId);
  const updated = {
    ...current,
    [itemKey]: !current[itemKey]
  };
  try {
    localStorage.setItem(`${STORAGE_KEYS.CHECKLISTS}_${oppId}`, JSON.stringify(updated));
  } catch {
    // Ignore
  }
  return updated;
};

export const getApplicationTracks = (): ApplicationTrackItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    if (!raw) {
      const defaultTracks: ApplicationTrackItem[] = [
        {
          opportunityId: 'opp-1',
          status: 'in_progress',
          pinnedAt: '2026-10-08T09:30:00Z',
          notes: 'Certified ID at Hillbrow Police Station on Tuesday. Need to submit by Thursday.',
          checklistState: { 'Certified copy of South African ID': true }
        },
        {
          opportunityId: 'opp-3',
          status: 'pinned',
          pinnedAt: '2026-10-09T14:15:00Z',
          notes: 'Gathering parent payslips for Sasol foundation income verification.',
          checklistState: {}
        }
      ];
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(defaultTracks));
      return defaultTracks;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

export const updateApplicationStatus = (oppId: string, status: ApplicationStatus, notes?: string): void => {
  const current = getApplicationTracks();
  const existingIndex = current.findIndex(t => t.opportunityId === oppId);
  let updated: ApplicationTrackItem[];

  if (existingIndex >= 0) {
    updated = [...current];
    updated[existingIndex] = {
      ...updated[existingIndex],
      status,
      notes: notes !== undefined ? notes : updated[existingIndex].notes
    };
  } else {
    updated = [
      ...current,
      {
        opportunityId: oppId,
        status,
        pinnedAt: new Date().toISOString(),
        notes: notes || '',
        checklistState: {}
      }
    ];
  }
  try {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(updated));
  } catch {
    // Ignore
  }
};

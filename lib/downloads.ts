import { createServerClient } from '@/lib/supabase/server'
import { Database } from '@/types/database.types'
import hardcodedDownloads from '@/config/downloadsData'

type DownloadRow = Database['public']['Tables']['downloads']['Row']

// Unified entry used by the downloads page; both languages included,
// the client component picks by active language.
export interface DownloadEntry {
  id: string
  title: string
  titleHr: string
  description: string
  descriptionHr: string
  /** Public URL or /public path of the file */
  file: string
  fileType: string
  fileSize: string
}

function formatFileSize(bytes: number | null): string {
  if (!bytes) return ''
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1).replace('.0', '')} MB`
}

function rowToEntry(row: DownloadRow): DownloadEntry {
  // Empty Croatian fields fall back to English
  return {
    id: row.id,
    title: row.title,
    titleHr: row.title_hr || row.title,
    description: row.description || '',
    descriptionHr: row.description_hr || row.description || '',
    file: row.file_url || '',
    fileType: row.file_type || 'PDF',
    fileSize: formatFileSize(row.file_size_bytes),
  }
}

// Fetch all published downloads (CMS rows first, then hardcoded fallbacks)
export async function getAllDownloads(): Promise<DownloadEntry[]> {
  const entries: DownloadEntry[] = []
  const idsSeen = new Set<string>()

  try {
    const supabase = await createServerClient()

    const { data: rows, error } = await supabase
      .from('downloads')
      .select('*')
      .eq('status', 'published')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (!error && rows && Array.isArray(rows)) {
      for (const row of rows as DownloadRow[]) {
        if (row.file_url) {
          entries.push(rowToEntry(row))
          idsSeen.add(row.id)
        }
      }
    }
  } catch (error) {
    console.error('Error fetching downloads from database:', error)
  }

  for (const item of hardcodedDownloads) {
    if (!idsSeen.has(item.id)) {
      entries.push({
        id: item.id,
        title: item.title,
        titleHr: item.titleHr,
        description: item.description,
        descriptionHr: item.descriptionHr,
        file: item.file,
        fileType: item.fileType,
        fileSize: item.fileSize,
      })
    }
  }

  return entries
}

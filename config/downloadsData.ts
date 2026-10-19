// Free downloadable resources listed on the /downloads page.
// To add a new file: drop it in public/downloads/ and add an entry here.
export interface DownloadItem {
  id: string
  /** Path under /public, e.g. '/downloads/file.pdf' */
  file: string
  fileType: string
  fileSize: string
  title: string
  titleHr: string
  description: string
  descriptionHr: string
}

// Downloads are managed in the CRM (Supabase `downloads` table).
// Entries here are static fallbacks shown alongside CMS content.
const downloads: DownloadItem[] = []

export default downloads

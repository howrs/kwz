import { createStorage } from "unstorage"

import supabaseStorageDriver, {
  type SupabaseOptions,
} from "lib/supabase/driver"

const opt: SupabaseOptions = {
  url: "https://lzcljkmtuupdgyrcvvlo.supabase.co",
  key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx6Y2xqa210dXVwZGd5cmN2dmxvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNjM1NjQ0MywiZXhwIjoyMDMxOTMyNDQzfQ.88soDoNlIqK-pEqndPDTVMe-w2c_Mc2Ki8kjHE54s0k`,
  bucket: "kv",
}

export const supa = createStorage({ driver: supabaseStorageDriver(opt) })

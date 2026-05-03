require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function check() {
  console.log("Checking favorites table...");
  const { data, error } = await supabase.from('favorites').select('*').limit(1);
  if (error) {
    console.error("Error querying favorites:", error.message);
  } else {
    console.log("Favorites table exists. Data:", data);
  }
}
check();

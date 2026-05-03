const fs = require('fs');

async function testSupabase() {
  try {
    const envContent = fs.readFileSync('.env', 'utf8');
    let supabaseUrl = '';
    let supabaseKey = '';
    
    envContent.split('\n').forEach(line => {
      if (line.startsWith('VITE_SUPABASE_URL=')) supabaseUrl = line.split('=')[1].trim().replace(/"/g, '');
      if (line.startsWith('VITE_SUPABASE_PUBLISHABLE_KEY=')) supabaseKey = line.split('=')[1].trim().replace(/"/g, '');
    });

    if (!supabaseUrl || !supabaseKey) {
      console.log('Missing env variables');
      return;
    }

    const res = await fetch(`${supabaseUrl}/rest/v1/favorites?select=*&limit=1`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    });

    const data = await res.json();
    console.log('Status:', res.status);
    console.log('Data:', data);
  } catch (err) {
    console.error('Error:', err);
  }
}

testSupabase();

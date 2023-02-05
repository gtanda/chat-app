require('dotenv').config();
const {createClient} = require("@supabase/supabase-js");

const PORT = process.env.PORT;
const supabaseURL = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseURL, supabaseAnonKey);
module.exports = { PORT, supabase };

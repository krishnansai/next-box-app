const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASEURL,
  process.env.SUPABASETOKEN
);

module.exports = supabase;

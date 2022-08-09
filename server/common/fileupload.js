const supabase = require("../config/supabase.config");

const uploadFile = async (file) => {
  const { data, error } = await supabase.storage
    .from("productimages")
    .upload("/" + file.originalname, file.buffer, {
      upsert: false,
      cacheControl: "3600",
      contentType: file.mimetype,
    });

  return {
    data,
    error,
  };
};

module.exports = uploadFile;

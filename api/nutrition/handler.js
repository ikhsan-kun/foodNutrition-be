const fetch = require("node-fetch");
const FormData = require("form-data");
const nutritionService = require("../../services/nutritionService");

const analyzeHandler = async (request, h) => {
  try {
    const userId = request.auth.credentials.id;
    const { file, save } = request.payload;

    if (!file) {
      return h.response({ error: "File gambar wajib diupload" }).code(400);
    }

    const formData = new FormData();
    formData.append("file", file, {
      filename: file.hapi.filename,
      contentType: file.hapi.headers["content-type"],
    });
    formData.append("save", String(save));

    const response = await fetch("https://foodnutrition-flask-production.up.railway.app/analyze", {
      method: "POST",
      body: formData,
      headers: formData.getHeaders(),
    });

    const text = await response.text();
    console.log("FastAPI response:", text);
    const data = JSON.parse(text);

    if (data.status === "success" && save) {
      const { food, kalori, protein, lemak, karbo } = data.data;
      await nutritionService.addHistory(userId, {
        food,
        kalori,
        protein,
        lemak,
        karbo,
      });
    }

    return h.response(data).code(200);
  } catch (err) {
    console.error("analyzeHandler error:", err);
    return h.response({ error: err.message }).code(500);
  }
};

module.exports = { analyzeHandler };

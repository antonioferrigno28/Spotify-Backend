const validateAccess = (req, res) => {
  const code = req.query.code || null;

  const body = `grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:3000/callback&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`;

  fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Data from Spotify:", data);

      const { access_token, refresh_token } = data;

      if (!access_token) {
        return res.status(500).json({ error: "Missing access token" });
      }

      // Creiamo un URL con l'access token come query string
      const redirectUrl = `http://localhost:5173/after?access_token=${access_token}&refresh_token=${refresh_token}`;

      // Redirigiamo alla pagina After con i dati
      res.redirect(redirectUrl);
    })
    .catch((error) => {
      console.error("Error fetching token:", error);
      return res.status(500).json({ error: "Failed to retrieve access token" });
    });
};

const fetchUserInfo = (req, res) => {
  const access_token = req.query.access_token; // O recuperato dalla sessione

  fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Spotify user info:", data); // Verifica cosa ricevi dalla API
      res.json(data); // Invia i dati come risposta
    })
    .catch((error) => {
      console.error("Error fetching user info:", error);
      res.status(500).json({ error: "Error fetching user info" });
    });
};

module.exports = { validateAccess, fetchUserInfo };

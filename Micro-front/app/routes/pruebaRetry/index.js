const { default: axios } = require("axios");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const implementacionRetry = (url, numeroIntentos) => {
      return new Promise((resolve, reject) => {
        let intentos = 1;

        const axios_retry = (url, n) => {
          return axios
            .get(url)
            .then((res) => {
              const status = res.data.status;
              if (status === 200) {
                return resolve(res);
              } else if (n === 1) {
                throw reject({
                  message: "Error in get http data",
                  status: res.data.status,
                });
              } else {
                console.log("Reintentando. Obtuve " + status);
                console.log("Con delay de " + intentos * 2000);
                setTimeout(() => {
                  intentos++;
                  axios_retry(url, n - 1);
                }, intentos * 2000);
              }
            })
            .catch(function (error) {
              if (n === 1) {
                reject(error);
              } else {
                setTimeout(() => {
                  intentos++;
                  axios_retry(url, n - 1);
                }, intentos * 2000);
              }
            });
        };
        return axios_retry(url, numeroIntentos);
      });
    };

    implementacionRetry("http://localhost:6999/api/pruebaRetry", 5)
      .then((x) => {
        console.log("Se obtuvo " + x.data.status);
        // console.log(x);
        res.json({ message: x.data.message, status: x.data.status });
      })
      .catch((e) => {
        console.log(e);
        res.json({ message: e.message, status: e.status });
      });

    return;
  } catch (error) {
    res.json({ message: "Error", status: 200 });
  }
});

router.post("/", async (req, res) => {
  res.json({ message: "¡Esta api no acepta peticiones POST!" });
});

module.exports = router;

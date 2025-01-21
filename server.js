const http = require("http");
const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");

// Enable/Disable Live Reload Feature
let enableLiveReload = false;

// Creating the server
const server = http.createServer((req, res) => {
  // Dynamically handle favicon.ico
  if (req.url === "/favicon.ico") {
    const faviconPath = path.join(__dirname, "favicon.ico");
    if (fs.existsSync(faviconPath)) {
      res.writeHead(200, { "Content-Type": "image/x-icon" });
      return fs.createReadStream(faviconPath).pipe(res);
    } else {
      res.writeHead(204);  // No Content if favicon doesn't exist
      return res.end();
    }
  }

  let filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url);
  console.log(`Requesting file: ${filePath}`);

  const extname = path.extname(filePath);
  let contentType = "text/html";

  if (extname === ".css") {
    contentType = "text/css";
  } else if (extname === ".js") {
    contentType = "application/javascript";
  }

  // Check if file exists and read it, otherwise return 404
  fs.exists(filePath, (exists) => {
    if (!exists) {
      res.writeHead(404);
      res.end("File Not Found");
    } else {
      fs.readFile(filePath, (err, content) => {
        if (err) {
          res.writeHead(500);
          res.end("Server Error");
        } else {
          res.writeHead(200, { "Content-Type": contentType });
          res.end(content);
        }
      });
    }
  });
});

// Function to toggle live reload
function toggleLiveReload() {
  enableLiveReload = !enableLiveReload;
  console.log(`Live reload is now ${enableLiveReload ? "enabled" : "disabled"}`);
}

if (enableLiveReload) {
  chokidar.watch("./").on("change", (path) => {
    console.log(`${path} has been updated`);
    // I will implement WebSocket or other methods here to notify the browser
    // For now, it's a simple console log to indicate changes
  });
}

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
  console.log("Press Ctrl+C to stop the server.");
  console.log("Toggle live reload by calling `toggleLiveReload()` in the console.");
});

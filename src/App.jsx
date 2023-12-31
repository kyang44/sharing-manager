import { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";
import "./App.css";
import { Dropbox } from "dropbox";

function App() {
  const CLIENT_ID = "v4b8qq4pogqtp31";
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [dbx, setDbx] = useState(new Dropbox({ clientId: CLIENT_ID }));

  const getAccessTokenFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.hash);
    return urlParams.get("#access_token");
  };

  const authenticateWithDropbox = () => {
    var authurl =
      "https://www.dropbox.com/oauth2/authorize?client_id=v4b8qq4pogqtp31&redirect_uri=http://localhost:5173/&response_type=token";
    window.location.href = authurl;
  };

  useEffect(() => {
    const accessToken = getAccessTokenFromUrl();
    if (accessToken) {
      setAuthenticated(true);
      setDbx(new Dropbox({ accessToken }));
    }
  }, []);

  async function saveFileContent() {
    try {
      await dbx.filesUpload({
        path: "/" + fileName,
        contents: text,
      });
      console.log("File saved to Dropbox");
    } catch (error) {
      console.error("Error saving file:", error);
      console.error("Dropbox API error:", error.response);
    }
  }

  async function handleSave() {
    const newFileName = window.prompt("Enter file name");
    if (newFileName) {
      setFileName(newFileName);
      await saveFileContent();
    }
  }

  return (
    <>
      <div className="App">
        {!authenticated ? (
          <div>
            <p>Please authenticate with Dropbox to use the editor</p>
            <button onClick={authenticateWithDropbox}>
              Authenticate with Dropbox
            </button>
          </div>
        ) : (
          <>
            <div className="editor">
              <CKEditor
                editor={ClassicEditor}
                data={text}
                onChange={(e, editor) => {
                  const data = editor.getData();
                  setText(data);
                }}
              />
              <button onClick={handleSave}>Save</button>
            </div>
            <div>
              <h2>Content</h2>
              <p>{parse(text)}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;

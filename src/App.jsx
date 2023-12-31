import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";
import "./App.css";
import { Dropbox } from "dropbox";

const dbx = new Dropbox({
  accessToken:
    "sl.BszL3MEFQ99QhA0gvFYuhZC7soPWSIN9MmbmwbcYYbu_1TyosghoQRDNyUU-RsdDbPY9-AN1xrbWywTm60bxr8RHF_xltffAAUNkcv5qetfIMniWDu8ZOtasA8RJqkGGWalVuD6sFCau",
});

function App() {
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("");

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
        <div className="editor">
          <CKEditor
            editor={ClassicEditor}
            data={text}
            onChange={(e, editor) => {
              const data = editor.getData();
              setText(data);
            }}
          />
          <button onClick={() => handleSave()}>Save</button>
        </div>
        <div>
          <h2>Content</h2>
          <p>{parse(text)}</p>
        </div>
      </div>
    </>
  );
}

export default App;

import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";
import "./App.css";

function App() {
  const [text, setText] = useState("");
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

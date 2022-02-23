import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import * as XLSX from 'xlsx';

interface AcceptedFilesProps{
  acceptedFiles:{
    file:Blob
   }[]
}

function App() {
  //  handleFile(file /*:File*/) {
  //   /* Boilerplate to set up FileReader */
  //   const reader = new FileReader();
  //   const rABS = !!reader.readAsBinaryString;
  //   reader.onload = e => {
  //     /* Parse data */
  //     const bstr = e.target.result;
  //     const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
  //     /* Get first worksheet */
  //     const wsname = wb.SheetNames[0];
  //     const ws = wb.Sheets[wsname];
  //     console.log(rABS, wb);
  //     /* Convert array of arrays */
  //     const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
  //     /* Update state */
  //     this.setState({ data: data, cols: make_cols(ws["!ref"]) });
  //   };
  //   if (rABS) reader.readAsBinaryString(file);
  //   else reader.readAsArrayBuffer(file);
  // }

  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader();
    reader.readAsBinaryString(acceptedFiles[0]);

    reader.onloadend = function () {
      const my_blob = reader.result
      //var workbook = XLSX.read(my_blob, {});
      const wb = XLSX.read(my_blob, { type: !!reader.readAsBinaryString ? "binary" : "array" });
      /* Get first worksheet */
      //const wsname = wb.SheetNames[0];
      //const ws = wb.Sheets[wsname];
      console.log(wb);
      /* Convert array of arrays */
      //const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

export default App;

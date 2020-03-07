import XLSX from "xlsx";

export default function uploadExcel(evt) {
  let files = evt.target.files;
  console.log(files);
  let json_to_send = [];
  let final_json = {};
  let file;

  if (!files || files.length === 0) return;

  file = files[0];

  let reader = new FileReader();

  reader.onload = e => {
    // pre-process data
    let binary = "";
    let bytes = new Uint8Array(e.target.result);
    let length = bytes.byteLength;
    for (let i = 0; i < length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    /* read workbook */
    let wb = XLSX.read(binary, { type: "binary" });

    /* grab first sheet */
    let wsname = wb.SheetNames[0];
    let ws = wb.Sheets[wsname];

    let href = "!ref";
    let splite_href = ws[href].split(":");
    let new_href = `A10:${splite_href[1]}`;
    ws[href] = new_href;

    /* generate JSON */

    let sheet_to_json = XLSX.utils.sheet_to_json(ws);

    if (sheet_to_json.length === 0) return;

    // Get headers
    let properties = Object.keys(sheet_to_json[0]);
    let headers = [];
    properties.map(val => {
      return headers.push(val);
    });

    if (headers.length !== 5) return;

    sheet_to_json.splice(0, 1);

    sheet_to_json.map(val => {
      json_to_send.push({
        code: "",
        apell_pat: "",
        apell_mat: "",
        nombre: "",
        email: ""
      });
      return val;
    });

    headers.map((header, i) => {
      sheet_to_json.map((obj, j) => {
        if (!obj[header]) {
          obj[header] = "";
        }

        switch (i) {
          case 0:
            json_to_send[j].code = obj[header];

            break;
          case 1:
            json_to_send[j].apell_pat = obj[header];

            break;
          case 2:
            json_to_send[j].apell_mat = obj[header];

            break;
          case 3:
            json_to_send[j].nombre = obj[header];

            break;

          default:
            json_to_send[j].email = obj[header];

            break;
        }
        return null;
      });
      return null;
    });

    final_json = {
      data: json_to_send,
      file: file.name
    };
  };

  reader.readAsArrayBuffer(file);
  evt.target.value = "";

  return final_json;
}

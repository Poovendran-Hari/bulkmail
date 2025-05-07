import React, { use, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx"

const BulkMail = () => {
  const [msg, setmsg] = useState("")
  const [sub, setsub] = useState("")
  const [status, setstatus] = useState("")
  const [emailList,setemailList] = useState([])
  const [file,setfile] =  useState()


  function handlesub(event) {
    setsub(event.target.value)
  }

  function handlemsg(event) {
    setmsg(event.target.value)
  }

  function handlesend() {
    setstatus(true)
    axios.post("http://localhost:5000/sendmail", 
      {
      msg: msg,
      sub: sub,
      email:emailList
    }
  ).then(function (data) {
      if (data.data === true) {
        alert("Your Email has Been Sent Successfully")
        setstatus(false)
        setmsg("")
        setsub("")
        setfile("")
      }
      else {
        alert("There is a Problem in Sending your E-mail")
      }
    })

  }

  function handlefile(event) {
    const file = event.target.files[0]
    console.log(file)

    const reader = new FileReader()
    reader.onload = function (e) {
      const data = e.target.result
      const workbook = XLSX.read(data, { type: "binary" })
      console.log(workbook)
      const sheetname = workbook.SheetNames[0]
      console.log(sheetname)
      const worksheet = workbook.Sheets[sheetname]
      const emaillist = XLSX.utils.sheet_to_json(worksheet,{header:'A'})
      const totalemail = emaillist.map(function(item){
        return item.A
        
      })
      setemailList(totalemail)
      console.log(totalemail)
      
    }
      
    reader.readAsBinaryString(file)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9fafb] to-[#e2e8f0] flex items-center justify-center px-4 font-[Poppins]">
      <div className="bg-white/90 text-gray-900 max-w-3xl w-full p-8 rounded-2xl shadow-xl border border-gray-300 backdrop-blur-sm">

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-[#4fa3f7] mb-2">BulkMail</h1>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Send multiple emails at once and scale your business with ease
        </p>

        {/* Drag and Drop Label */}
        <p className="text-center text-md font-extrabold mb-4 text-gray-700">Drag and Drop</p>

        {/* Subject Input */}
        <input
          type="text" onChange={handlesub} value={sub}
          placeholder="Enter email subject"
          className="w-full bg-white border border-gray-300 text-gray-800 rounded-md p-3 mb-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4fa3f7]"
        />

        {/* Email Textarea */}
        <textarea
          placeholder="Enter the email text ...." onChange={handlemsg} value={msg}
          className="w-full h-40 bg-white border border-gray-300 text-gray-800 rounded-md p-4 placeholder-gray-500 shadow-inner resize-none mb-6 focus:outline-none focus:ring-2 focus:ring-[#4fa3f7]"
        />

        {/* File Upload */}
        <div className="w-full border-2 border-dashed border-[#4fa3f7] bg-white rounded-lg p-4 flex justify-center items-center mb-4">
          <input
            type="file" onChange={handlefile} value={file}
            className="text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-[#4fa3f7] file:text-white hover:file:bg-[#3b8fbf]"
          />
        </div>

        {/* Email Count */}
        <div className="text-center text-sm mb-6">
          Total Emails in the file: <span className="font-semibold text-[#4fa3f7]">{emailList.length}</span>
        </div>

        {/* Send Button */}
        <div className="flex justify-center">
          <button type="submit" onClick={handlesend} className="bg-[#4fa3f7] hover:bg-[#3b8fbf] text-white font-semibold px-6 py-2 rounded-md shadow-md transition">
            {status ? "Sending.." : "Send"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default BulkMail;

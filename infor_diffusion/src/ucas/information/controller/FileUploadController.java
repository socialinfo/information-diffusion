package ucas.information.controller;

import java.io.File;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import ucas.information.entity.Message;

@Controller
public class FileUploadController {
	String fileName = "output.json"; 
	@RequestMapping(value = "/upload.do")  
	public String upload(@RequestParam(value = "file", required = false) MultipartFile file, HttpServletRequest request,HttpServletResponse response) {  
	        Message message = new Message();
	        message.setStatus(0);
	        //String path = request.getSession().getServletContext().getRealPath("upload");  
		 	String path = request.getSession().getServletContext().getRealPath("")+"/json/";
	        //String fileName = file.getOriginalFilename();  
	        System.out.println(path);  
	        UUID uuid = UUID.randomUUID(); 
	        String fileName = uuid.toString()+".json";
	        System.out.println(fileName);
	        File targetFile = new File(path, fileName);  
	        this.fileName = fileName;
	        if(!targetFile.exists()){  
	            targetFile.mkdirs();  
	        }  
	        if(targetFile.exists()){
	        	targetFile.delete();
	        }
	        //保存  
	        try {  
	            file.transferTo(targetFile);  
	        } catch (Exception e) {  
	            e.printStackTrace();  
	            message.setStatus(1);
	            message.setMessage(e.toString());
	        }
	       
	        return "epidemic/main";  
	    }  
	 @RequestMapping(value = "/getcurfile.do")
	 @ResponseBody
	 public Message getFileName(){
		 Message message = new Message();
		 message.setStatus(0);
		 message.setMessage(fileName);
		 return message;
	 }
	}  

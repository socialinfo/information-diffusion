/**
 *作者：JasonMu
 *时间：
 *版本：
 *功能：
 */

package ucas.information.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import ucas.information.entity.CascadeId;
import ucas.information.service.Maximizing_the_spread_of_cascades;

@Controller
public class CascadeController {
	Maximizing_the_spread_of_cascades service = new Maximizing_the_spread_of_cascades();
	@RequestMapping(value="cascade.do",method={RequestMethod.GET,RequestMethod.POST})
	@ResponseBody
	public CascadeId maxmize(@RequestParam(value = "file", required = true) String fileName,HttpServletRequest request){
		String path = request.getSession().getServletContext().getRealPath("")+"/json/cascades/"+fileName;
		return service.maximize(path);
	}
	
}

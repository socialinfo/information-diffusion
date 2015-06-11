package ucas.information.controller;
import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import ucas.information.entity.DrawModel;
import ucas.information.entity.Message;
import ucas.information.entity.ModelPoint;
import ucas.information.entity.SIModel;
import ucas.information.service.EpidemicService;

@Controller
public class EpidemicController {
	@Resource(name = "epidemicService")
    private EpidemicService service;
	@RequestMapping(value = "simodel.do",method={RequestMethod.GET,RequestMethod.POST})
	@ResponseBody
	public SIModel fittingData(@RequestParam(value = "xs", required = true) int []xs, @RequestParam(value = "ys",required = true) int[] ys){
		return service.fittingModel(xs, ys);
	}
	@RequestMapping(value = "drawmodel.do",method={RequestMethod.GET,RequestMethod.POST})
	@ResponseBody
	public ModelPoint DrawModel(@ModelAttribute DrawModel model){
		//System.out.println(model);
		return service.drawModel(model);
	}
	@RequestMapping(value = "dynamicmodel.do",method={RequestMethod.GET,RequestMethod.POST})
	@ResponseBody
	public Message DynamicModel(DrawModel model){
		return service.DynamicModel(model);
	}
}

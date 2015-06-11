/**
 *作者：JasonMu
 *时间：
 *版本：
 *功能：
 */

package ucas.information.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import ucas.information.service.Maximizing_the_spread_of_cascades;

public class MaximizingController {
	private Maximizing_the_spread_of_cascades msc;
	@RequestMapping(value = "maximizing.do",method={RequestMethod.GET,RequestMethod.POST})
	@ResponseBody
	public List<Integer>[] Maxmizing(){
		return msc.slist;
	}
}

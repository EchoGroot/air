package com.huibo.listener;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import org.springframework.web.context.support.WebApplicationContextUtils;

import com.huibo.po.AirportLogThread;
import com.huibo.service.AirportServer;


@WebListener
public class AirThreadListener implements ServletContextListener{
	private AirportLogThread aThread;
	/**
	 * 服务器监听，会话销毁时执行关闭该客户端线程
	 */	
	@Override
	public void contextDestroyed(ServletContextEvent sce) {	
		aThread.close();
	}
	/**
	 * 服务器监听，会话启动时执行启动该客户端线程
	 */	
	@Override
	public void contextInitialized(ServletContextEvent sce) {
		AirportServer as=WebApplicationContextUtils.getRequiredWebApplicationContext(sce.getServletContext())
				.getBean(AirportServer.class);		
		aThread=new AirportLogThread(as);
		aThread.start();
	}

}

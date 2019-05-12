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
	 * �������������Ự����ʱִ�йرոÿͻ����߳�
	 */	
	@Override
	public void contextDestroyed(ServletContextEvent sce) {	
		aThread.close();
	}
	/**
	 * �������������Ự����ʱִ�������ÿͻ����߳�
	 */	
	@Override
	public void contextInitialized(ServletContextEvent sce) {
		AirportServer as=WebApplicationContextUtils.getRequiredWebApplicationContext(sce.getServletContext())
				.getBean(AirportServer.class);		
		aThread=new AirportLogThread(as);
		aThread.start();
	}

}

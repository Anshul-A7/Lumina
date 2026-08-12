2026-08-12T18:00:26.109582158Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T18:00:26.310090602Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T18:00:27.239544213Z [inf]  Hibernate: update users set auth_provider=?,email=?,email_verified=?,password=?,profile_image_url=?,razorpay_customer_id=?,role=?,subscription_plan=?,updated_at=?,username=? where id=?
2026-08-12T18:00:27.416146856Z [inf]  Hibernate: select s1_0.id,s1_0.active,s1_0.billing_cycle,s1_0.cancel_at_cycle_end,s1_0.created_at,s1_0.current_period_end,s1_0.current_period_start,s1_0.end_date,s1_0.plan,s1_0.razorpay_plan_id,s1_0.razorpay_subscription_id,s1_0.start_date,s1_0.status,s1_0.updated_at,s1_0.user_id from subscriptions s1_0 left join users u1_0 on u1_0.id=s1_0.user_id where u1_0.email=?
2026-08-12T18:00:27.588179144Z [inf]  2026-08-12T18:00:27.586Z  INFO 1 --- [smart-notes-api] [nio-8080-exec-8] c.j.s.service.RazorpayService            : Creating Razorpay Subscription. CustomerID: 'cust_TOww7JNhu6h131', PlanID: 'plan_TOuvcE0VB6FIrq'
2026-08-12T18:00:27.759237548Z [inf]  2026-08-12T18:00:27.752Z ERROR 1 --- [smart-notes-api] [nio-8080-exec-8] c.j.s.service.RazorpayService            : Failed to create Razorpay subscription for customer cust_TOww7JNhu6h131 and plan plan_TOuvcE0VB6FIrq
2026-08-12T18:00:27.759243218Z [inf]  
2026-08-12T18:00:27.759246537Z [inf]  com.razorpay.RazorpayException: BAD_REQUEST_ERROR:The ID provided is invalid or could not be found.
2026-08-12T18:00:27.759249677Z [inf]  	at com.razorpay.ApiClient.throwException(ApiClient.java:228) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T18:00:27.759252807Z [inf]  	at com.razorpay.ApiClient.processResponse(ApiClient.java:180) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T18:00:27.759255727Z [inf]  	at com.razorpay.ApiClient.post(ApiClient.java:55) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T18:00:27.759258487Z [inf]  	at com.razorpay.SubscriptionClient.post(SubscriptionClient.java:7) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T18:00:27.759261327Z [inf]  	at com.razorpay.ApiClient.post(ApiClient.java:50) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T18:00:27.759263567Z [inf]  	at com.razorpay.SubscriptionClient.post(SubscriptionClient.java:7) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T18:00:27.759266367Z [inf]  	at com.razorpay.SubscriptionClient.create(SubscriptionClient.java:14) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T18:00:27.759268767Z [inf]  	at com.jeevan.smart_notes_api.service.RazorpayService.createSubscription(RazorpayService.java:75) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T18:00:27.759271277Z [inf]  	at com.jeevan.smart_notes_api.service.SubscriptionService.createCheckoutSession(SubscriptionService.java:183) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T18:00:27.759273707Z [inf]  	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(Unknown Source) ~[na:na]
2026-08-12T18:00:27.759276367Z [inf]  	at java.base/java.lang.reflect.Method.invoke(Unknown Source) ~[na:na]
2026-08-12T18:00:27.759278637Z [inf]  	at org.springframework.aop.support.AopUtils.invokeJoinpointUsingReflection(AopUtils.java:360) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.759554482Z [inf]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.invokeJoinpoint(ReflectiveMethodInvocation.java:196) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.759559092Z [inf]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:163) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.759561892Z [inf]  	at org.springframework.transaction.interceptor.TransactionAspectSupport.invokeWithinTransaction(TransactionAspectSupport.java:380) ~[spring-tx-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.759564492Z [inf]  	at org.springframework.transaction.interceptor.TransactionInterceptor.invoke(TransactionInterceptor.java:119) ~[spring-tx-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.759567662Z [inf]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:184) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.759570632Z [inf]  	at org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:728) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.759573512Z [inf]  	at com.jeevan.smart_notes_api.service.SubscriptionService$$SpringCGLIB$$0.createCheckoutSession(<generated>) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T18:00:27.759576162Z [inf]  	at com.jeevan.smart_notes_api.controller.SubscriptionController.createCheckoutSession(SubscriptionController.java:60) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T18:00:27.759580312Z [inf]  	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(Unknown Source) ~[na:na]
2026-08-12T18:00:27.759582652Z [inf]  	at java.base/java.lang.reflect.Method.invoke(Unknown Source) ~[na:na]
2026-08-12T18:00:27.759585032Z [inf]  	at org.springframework.web.method.support.InvocableHandlerMethod.doInvoke(InvocableHandlerMethod.java:258) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.759587342Z [inf]  	at org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:191) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.759990085Z [inf]  	at org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:118) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.759993015Z [inf]  	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:991) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.759995305Z [inf]  	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:896) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.759999845Z [inf]  	at org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:87) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.760002065Z [inf]  	at org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:1089) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.760005135Z [inf]  	at org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:979) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.760007855Z [inf]  	at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:1014) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.760011055Z [inf]  	at org.springframework.web.servlet.FrameworkServlet.doPost(FrameworkServlet.java:914) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.760013525Z [inf]  	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:590) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:27.760015905Z [inf]  	at org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:885) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.760018445Z [inf]  	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:658) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:27.760021105Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:27.760487807Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:27.760503037Z [inf]  	at org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:51) ~[tomcat-embed-websocket-10.1.54.jar!/:na]
2026-08-12T18:00:27.760507726Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:27.760511626Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:27.760515076Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:110) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.760518956Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:27.760521936Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:27.760524916Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:108) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.760528176Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:108) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.760531746Z [inf]  	at org.springframework.security.web.FilterChainProxy.lambda$doFilterInternal$3(FilterChainProxy.java:231) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:27.760537406Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:370) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:27.760540506Z [inf]  	at org.springframework.security.web.access.intercept.AuthorizationFilter.doFilter(AuthorizationFilter.java:101) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:27.761067868Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:27.761080488Z [inf]  	at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:125) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:27.761086318Z [inf]  	at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:119) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:27.761090248Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:27.761094458Z [inf]  	at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:131) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:27.761099118Z [inf]  	at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:85) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:27.761107607Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:27.761111937Z [inf]  	at org.springframework.security.web.authentication.AnonymousAuthenticationFilter.doFilter(AnonymousAuthenticationFilter.java:100) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:27.761116377Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:27.761121517Z [inf]  	at org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter.doFilter(SecurityContextHolderAwareRequestFilter.java:179) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:27.761594909Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:27.761598849Z [inf]  	at org.springframework.security.web.savedrequest.RequestCacheAwareFilter.doFilter(RequestCacheAwareFilter.java:63) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:27.761602159Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:27.761605869Z [inf]  	at com.jeevan.smart_notes_api.security.jwt.JwtFilter.doFilterInternal(JwtFilter.java:74) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T18:00:27.761610859Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.761613949Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:27.761618199Z [inf]  	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:107) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:27.761621369Z [inf]  	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:93) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:27.761624729Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:27.761627459Z [inf]  	at org.springframework.web.filter.CorsFilter.doFilterInternal(CorsFilter.java:91) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.761668748Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.761673198Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:27.761976073Z [inf]  	at org.springframework.security.web.header.HeaderWriterFilter.doHeadersAfter(HeaderWriterFilter.java:90) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:27.761978763Z [inf]  	at org.springframework.security.web.header.HeaderWriterFilter.doFilterInternal(HeaderWriterFilter.java:75) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:27.761981263Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.761983953Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:27.761986353Z [inf]  	at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:82) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:27.761988853Z [inf]  	at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:69) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:27.761991913Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:27.761994753Z [inf]  	at org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter.doFilterInternal(WebAsyncManagerIntegrationFilter.java:62) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:27.761997243Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.762000493Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:27.762003152Z [inf]  	at org.springframework.security.web.session.DisableEncodeUrlFilter.doFilterInternal(DisableEncodeUrlFilter.java:42) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:27.762378566Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.762380836Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:27.762382986Z [inf]  	at org.springframework.security.web.FilterChainProxy.doFilterInternal(FilterChainProxy.java:233) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:27.762385076Z [inf]  	at org.springframework.security.web.FilterChainProxy.doFilter(FilterChainProxy.java:191) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:27.762387216Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.762390546Z [inf]  	at org.springframework.web.filter.ServletRequestPathFilter.doFilter(ServletRequestPathFilter.java:52) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.762392786Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.762394926Z [inf]  	at org.springframework.web.filter.CompositeFilter.doFilter(CompositeFilter.java:74) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.762397196Z [inf]  	at org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration$CompositeFilterChainProxy.doFilter(WebSecurityConfiguration.java:319) ~[spring-security-config-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:27.762399336Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.762401516Z [inf]  	at org.springframework.web.servlet.handler.HandlerMappingIntrospector.lambda$createCacheFilter$4(HandlerMappingIntrospector.java:267) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.763289032Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.763292932Z [inf]  	at org.springframework.web.filter.CompositeFilter.doFilter(CompositeFilter.java:74) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.763296012Z [inf]  	at org.springframework.security.config.annotation.web.configuration.WebMvcSecurityConfiguration$CompositeFilterChainProxy.doFilter(WebMvcSecurityConfiguration.java:240) ~[spring-security-config-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:27.763298902Z [inf]  	at org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:362) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.763302592Z [inf]  	at org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:278) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.763305772Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:27.763308472Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:27.763311212Z [inf]  	at org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:100) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.763313772Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.763316202Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:27.763318542Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:27.763320761Z [inf]  	at org.springframework.web.filter.FormContentFilter.doFilterInternal(FormContentFilter.java:93) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.763823083Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.763857323Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:27.763870182Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:27.763874142Z [inf]  	at org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:201) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.763877812Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.763882662Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:27.763885582Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:27.763888692Z [inf]  	at org.springframework.web.filter.ForwardedHeaderFilter.doFilterInternal(ForwardedHeaderFilter.java:173) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.763891972Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:27.763895042Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:27.763898312Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:27.764307655Z [inf]  	at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:165) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:27.764310665Z [inf]  	at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:88) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:27.764313595Z [inf]  	at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:492) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:27.764316275Z [inf]  	at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:113) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:27.764318705Z [inf]  	at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:83) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:27.764321985Z [inf]  	at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:72) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:27.764324445Z [inf]  	at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:342) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:27.764326885Z [inf]  	at org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:399) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:27.764329015Z [inf]  	at org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:63) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:27.764331175Z [inf]  	at org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:903) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:27.764333445Z [inf]  	at org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1797) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:27.764336675Z [inf]  	at org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:52) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:27.764340124Z [inf]  	at org.apache.tomcat.util.threads.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:973) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:27.764673689Z [inf]  	at org.apache.tomcat.util.threads.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:491) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:27.764676109Z [inf]  	at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:63) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:27.764679089Z [inf]  	at java.base/java.lang.Thread.run(Unknown Source) ~[na:na]
2026-08-12T18:00:27.764682409Z [inf]  
2026-08-12T18:00:27.934903406Z [err]  java.lang.RuntimeException: Failed to create Razorpay subscription
2026-08-12T18:00:27.934908717Z [err]  	at com.jeevan.smart_notes_api.service.RazorpayService.createSubscription(RazorpayService.java:78)
2026-08-12T18:00:27.934912517Z [err]  	at com.jeevan.smart_notes_api.service.SubscriptionService.createCheckoutSession(SubscriptionService.java:183)
2026-08-12T18:00:27.934915916Z [err]  	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(Unknown Source)
2026-08-12T18:00:27.934919166Z [err]  	at java.base/java.lang.reflect.Method.invoke(Unknown Source)
2026-08-12T18:00:27.934922246Z [err]  	at org.springframework.aop.support.AopUtils.invokeJoinpointUsingReflection(AopUtils.java:360)
2026-08-12T18:00:27.934927546Z [err]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.invokeJoinpoint(ReflectiveMethodInvocation.java:196)
2026-08-12T18:00:27.934930506Z [err]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:163)
2026-08-12T18:00:27.934934716Z [err]  	at org.springframework.transaction.interceptor.TransactionAspectSupport.invokeWithinTransaction(TransactionAspectSupport.java:380)
2026-08-12T18:00:27.934938386Z [err]  	at org.springframework.transaction.interceptor.TransactionInterceptor.invoke(TransactionInterceptor.java:119)
2026-08-12T18:00:27.934941766Z [err]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:184)
2026-08-12T18:00:27.934944696Z [err]  	at org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:728)
2026-08-12T18:00:27.934947926Z [err]  	at com.jeevan.smart_notes_api.service.SubscriptionService$$SpringCGLIB$$0.createCheckoutSession(<generated>)
2026-08-12T18:00:27.934951476Z [err]  	at com.jeevan.smart_notes_api.controller.SubscriptionController.createCheckoutSession(SubscriptionController.java:60)
2026-08-12T18:00:27.935466897Z [err]  	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(Unknown Source)
2026-08-12T18:00:27.935470327Z [err]  	at java.base/java.lang.reflect.Method.invoke(Unknown Source)
2026-08-12T18:00:27.935474017Z [err]  	at org.springframework.web.method.support.InvocableHandlerMethod.doInvoke(InvocableHandlerMethod.java:258)
2026-08-12T18:00:27.935478097Z [err]  	at org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:191)
2026-08-12T18:00:27.935481307Z [err]  	at org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:118)
2026-08-12T18:00:27.935485837Z [err]  	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:991)
2026-08-12T18:00:27.935488877Z [err]  	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:896)
2026-08-12T18:00:27.935491757Z [err]  	at org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:87)
2026-08-12T18:00:27.935495247Z [err]  	at org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:1089)
2026-08-12T18:00:27.935498507Z [err]  	at org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:979)
2026-08-12T18:00:27.935502097Z [err]  	at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:1014)
2026-08-12T18:00:27.935505257Z [err]  	at org.springframework.web.servlet.FrameworkServlet.doPost(FrameworkServlet.java:914)
2026-08-12T18:00:27.935508197Z [err]  	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:590)
2026-08-12T18:00:27.935511407Z [err]  	at org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:885)
2026-08-12T18:00:27.935882240Z [err]  	at org.springframework.security.web.access.intercept.AuthorizationFilter.doFilter(AuthorizationFilter.java:101)
2026-08-12T18:00:27.935890150Z [err]  	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:658)
2026-08-12T18:00:27.935891000Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T18:00:27.935897960Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)
2026-08-12T18:00:27.935901040Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T18:00:27.935903720Z [err]  	at org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:51)
2026-08-12T18:00:27.935906410Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T18:00:27.935909400Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T18:00:27.935912510Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:110)
2026-08-12T18:00:27.935915470Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T18:00:27.935918820Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T18:00:27.935921390Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:108)
2026-08-12T18:00:27.935925660Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:108)
2026-08-12T18:00:27.935928180Z [err]  	at org.springframework.security.web.FilterChainProxy.lambda$doFilterInternal$3(FilterChainProxy.java:231)
2026-08-12T18:00:27.935930760Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:370)
2026-08-12T18:00:27.936284524Z [err]  	at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:125)
2026-08-12T18:00:27.936289414Z [err]  	at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:119)
2026-08-12T18:00:27.936295923Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T18:00:27.936299273Z [err]  	at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:131)
2026-08-12T18:00:27.936303773Z [err]  	at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:85)
2026-08-12T18:00:27.936307633Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T18:00:27.936311783Z [err]  	at org.springframework.security.web.authentication.AnonymousAuthenticationFilter.doFilter(AnonymousAuthenticationFilter.java:100)
2026-08-12T18:00:27.936314853Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T18:00:27.936317903Z [err]  	at org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter.doFilter(SecurityContextHolderAwareRequestFilter.java:179)
2026-08-12T18:00:27.936320943Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T18:00:27.936324163Z [err]  	at org.springframework.security.web.savedrequest.RequestCacheAwareFilter.doFilter(RequestCacheAwareFilter.java:63)
2026-08-12T18:00:27.936327163Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T18:00:27.936331133Z [err]  	at com.jeevan.smart_notes_api.security.jwt.JwtFilter.doFilterInternal(JwtFilter.java:74)
2026-08-12T18:00:27.936794735Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T18:00:27.936797245Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T18:00:27.936800575Z [err]  	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:107)
2026-08-12T18:00:27.936802775Z [err]  	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:93)
2026-08-12T18:00:27.936805315Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T18:00:27.936808055Z [err]  	at org.springframework.web.filter.CorsFilter.doFilterInternal(CorsFilter.java:91)
2026-08-12T18:00:27.936811235Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T18:00:27.936814225Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T18:00:27.936816785Z [err]  	at org.springframework.security.web.header.HeaderWriterFilter.doHeadersAfter(HeaderWriterFilter.java:90)
2026-08-12T18:00:27.936819325Z [err]  	at org.springframework.security.web.header.HeaderWriterFilter.doFilterInternal(HeaderWriterFilter.java:75)
2026-08-12T18:00:27.936821905Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T18:00:27.936824225Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T18:00:27.936827535Z [err]  	at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:82)
2026-08-12T18:00:27.936830685Z [err]  	at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:69)
2026-08-12T18:00:27.937162749Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T18:00:27.937166049Z [err]  	at org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter.doFilterInternal(WebAsyncManagerIntegrationFilter.java:62)
2026-08-12T18:00:27.937169479Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T18:00:27.937172449Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T18:00:27.937175449Z [err]  	at org.springframework.security.web.session.DisableEncodeUrlFilter.doFilterInternal(DisableEncodeUrlFilter.java:42)
2026-08-12T18:00:27.937178349Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T18:00:27.937181299Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T18:00:27.937184569Z [err]  	at org.springframework.security.web.FilterChainProxy.doFilterInternal(FilterChainProxy.java:233)
2026-08-12T18:00:27.937187489Z [err]  	at org.springframework.security.web.FilterChainProxy.doFilter(FilterChainProxy.java:191)
2026-08-12T18:00:27.937190499Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113)
2026-08-12T18:00:27.937193758Z [err]  	at org.springframework.web.filter.ServletRequestPathFilter.doFilter(ServletRequestPathFilter.java:52)
2026-08-12T18:00:27.937196838Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113)
2026-08-12T18:00:27.937199938Z [err]  	at org.springframework.web.filter.CompositeFilter.doFilter(CompositeFilter.java:74)
2026-08-12T18:00:27.937203478Z [err]  	at org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration$CompositeFilterChainProxy.doFilter(WebSecurityConfiguration.java:319)
2026-08-12T18:00:27.937729061Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T18:00:27.937732540Z [err]  	at org.springframework.web.filter.FormContentFilter.doFilterInternal(FormContentFilter.java:93)
2026-08-12T18:00:27.937746170Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113)
2026-08-12T18:00:27.937756840Z [err]  	at org.springframework.web.servlet.handler.HandlerMappingIntrospector.lambda$createCacheFilter$4(HandlerMappingIntrospector.java:267)
2026-08-12T18:00:27.937759560Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113)
2026-08-12T18:00:27.937762060Z [err]  	at org.springframework.web.filter.CompositeFilter.doFilter(CompositeFilter.java:74)
2026-08-12T18:00:27.937764920Z [err]  	at org.springframework.security.config.annotation.web.configuration.WebMvcSecurityConfiguration$CompositeFilterChainProxy.doFilter(WebMvcSecurityConfiguration.java:240)
2026-08-12T18:00:27.937767860Z [err]  	at org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:362)
2026-08-12T18:00:27.937770710Z [err]  	at org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:278)
2026-08-12T18:00:27.937773370Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T18:00:27.937775900Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T18:00:27.937778560Z [err]  	at org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:100)
2026-08-12T18:00:27.937781010Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T18:00:27.937783530Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T18:00:27.938232362Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T18:00:27.938235902Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T18:00:27.938239812Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T18:00:27.938243552Z [err]  	at org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:201)
2026-08-12T18:00:27.938246902Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T18:00:27.938250102Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T18:00:27.938253722Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T18:00:27.938257002Z [err]  	at org.springframework.web.filter.ForwardedHeaderFilter.doFilterInternal(ForwardedHeaderFilter.java:173)
2026-08-12T18:00:27.938260072Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T18:00:27.938264182Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T18:00:27.938267082Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T18:00:27.938270472Z [err]  	at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:165)
2026-08-12T18:00:27.938273551Z [err]  	at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:88)
2026-08-12T18:00:27.938276241Z [err]  	at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:492)
2026-08-12T18:00:27.938279261Z [err]  	at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:113)
2026-08-12T18:00:27.938657075Z [err]  	at com.razorpay.SubscriptionClient.post(SubscriptionClient.java:7)
2026-08-12T18:00:27.938659665Z [err]  	at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:83)
2026-08-12T18:00:27.938665065Z [err]  	at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:72)
2026-08-12T18:00:27.938668385Z [err]  	at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:342)
2026-08-12T18:00:27.938671815Z [err]  	at org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:399)
2026-08-12T18:00:27.938675245Z [err]  	at org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:63)
2026-08-12T18:00:27.938680765Z [err]  	at org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:903)
2026-08-12T18:00:27.938684785Z [err]  	at org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1797)
2026-08-12T18:00:27.938689365Z [err]  	at org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:52)
2026-08-12T18:00:27.938694414Z [err]  	at org.apache.tomcat.util.threads.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:973)
2026-08-12T18:00:27.938698394Z [err]  	at com.razorpay.ApiClient.throwException(ApiClient.java:228)
2026-08-12T18:00:27.938699804Z [err]  	at org.apache.tomcat.util.threads.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:491)
2026-08-12T18:00:27.938703964Z [err]  	at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:63)
2026-08-12T18:00:27.938708524Z [err]  	at java.base/java.lang.Thread.run(Unknown Source)
2026-08-12T18:00:27.938716754Z [err]  Caused by: com.razorpay.RazorpayException: BAD_REQUEST_ERROR:The ID provided is invalid or could not be found.
2026-08-12T18:00:27.938720944Z [err]  	at com.razorpay.ApiClient.processResponse(ApiClient.java:180)
2026-08-12T18:00:27.938725534Z [err]  	at com.razorpay.ApiClient.post(ApiClient.java:55)
2026-08-12T18:00:27.939808636Z [err]  	at com.razorpay.ApiClient.post(ApiClient.java:50)
2026-08-12T18:00:27.939811876Z [err]  	at com.razorpay.SubscriptionClient.post(SubscriptionClient.java:7)
2026-08-12T18:00:27.939816626Z [err]  	at com.razorpay.SubscriptionClient.create(SubscriptionClient.java:14)
2026-08-12T18:00:27.939820016Z [err]  	at com.jeevan.smart_notes_api.service.RazorpayService.createSubscription(RazorpayService.java:75)
2026-08-12T18:00:27.939822876Z [err]  	... 123 more
2026-08-12T18:00:29.895888643Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T18:00:30.261227482Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T18:00:30.604886004Z [inf]  Hibernate: update users set auth_provider=?,email=?,email_verified=?,password=?,profile_image_url=?,razorpay_customer_id=?,role=?,subscription_plan=?,updated_at=?,username=? where id=?
2026-08-12T18:00:30.770592985Z [inf]  Hibernate: select s1_0.id,s1_0.active,s1_0.billing_cycle,s1_0.cancel_at_cycle_end,s1_0.created_at,s1_0.current_period_end,s1_0.current_period_start,s1_0.end_date,s1_0.plan,s1_0.razorpay_plan_id,s1_0.razorpay_subscription_id,s1_0.start_date,s1_0.status,s1_0.updated_at,s1_0.user_id from subscriptions s1_0 left join users u1_0 on u1_0.id=s1_0.user_id where u1_0.email=?
2026-08-12T18:00:30.951915820Z [inf]  2026-08-12T18:00:30.943Z  INFO 1 --- [smart-notes-api] [nio-8080-exec-4] c.j.s.service.RazorpayService            : Creating Razorpay Subscription. CustomerID: 'cust_TOwwAzyXdlfN7R', PlanID: 'plan_TOuvcE0VB6FIrq'
2026-08-12T18:00:31.124982201Z [inf]  2026-08-12T18:00:31.098Z ERROR 1 --- [smart-notes-api] [nio-8080-exec-4] c.j.s.service.RazorpayService            : Failed to create Razorpay subscription for customer cust_TOwwAzyXdlfN7R and plan plan_TOuvcE0VB6FIrq
2026-08-12T18:00:31.124986311Z [inf]  
2026-08-12T18:00:31.124988791Z [inf]  com.razorpay.RazorpayException: BAD_REQUEST_ERROR:The ID provided is invalid or could not be found.
2026-08-12T18:00:31.124991441Z [inf]  	at com.razorpay.ApiClient.throwException(ApiClient.java:228) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T18:00:31.124993741Z [inf]  	at com.razorpay.ApiClient.processResponse(ApiClient.java:180) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T18:00:31.124996761Z [inf]  	at com.razorpay.ApiClient.post(ApiClient.java:55) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T18:00:31.124999801Z [inf]  	at com.razorpay.SubscriptionClient.post(SubscriptionClient.java:7) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T18:00:31.125003011Z [inf]  	at com.razorpay.ApiClient.post(ApiClient.java:50) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T18:00:31.125005301Z [inf]  	at com.razorpay.SubscriptionClient.post(SubscriptionClient.java:7) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T18:00:31.125007721Z [inf]  	at com.razorpay.SubscriptionClient.create(SubscriptionClient.java:14) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T18:00:31.125009971Z [inf]  	at com.jeevan.smart_notes_api.service.RazorpayService.createSubscription(RazorpayService.java:75) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T18:00:31.125012091Z [inf]  	at com.jeevan.smart_notes_api.service.SubscriptionService.createCheckoutSession(SubscriptionService.java:183) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T18:00:31.125014351Z [inf]  	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(Unknown Source) ~[na:na]
2026-08-12T18:00:31.125016901Z [inf]  	at java.base/java.lang.reflect.Method.invoke(Unknown Source) ~[na:na]
2026-08-12T18:00:31.125019051Z [inf]  	at org.springframework.aop.support.AopUtils.invokeJoinpointUsingReflection(AopUtils.java:360) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.125254877Z [inf]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.invokeJoinpoint(ReflectiveMethodInvocation.java:196) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.125260007Z [inf]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:163) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.125263787Z [inf]  	at org.springframework.transaction.interceptor.TransactionAspectSupport.invokeWithinTransaction(TransactionAspectSupport.java:380) ~[spring-tx-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.125267046Z [inf]  	at org.springframework.transaction.interceptor.TransactionInterceptor.invoke(TransactionInterceptor.java:119) ~[spring-tx-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.125270126Z [inf]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:184) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.125273636Z [inf]  	at org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:728) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.125277276Z [inf]  	at com.jeevan.smart_notes_api.service.SubscriptionService$$SpringCGLIB$$0.createCheckoutSession(<generated>) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T18:00:31.125280456Z [inf]  	at com.jeevan.smart_notes_api.controller.SubscriptionController.createCheckoutSession(SubscriptionController.java:60) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T18:00:31.125283616Z [inf]  	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(Unknown Source) ~[na:na]
2026-08-12T18:00:31.125286886Z [inf]  	at java.base/java.lang.reflect.Method.invoke(Unknown Source) ~[na:na]
2026-08-12T18:00:31.125290216Z [inf]  	at org.springframework.web.method.support.InvocableHandlerMethod.doInvoke(InvocableHandlerMethod.java:258) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.125293186Z [inf]  	at org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:191) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.126137262Z [inf]  	at org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:118) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.126142462Z [inf]  	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:991) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.126146362Z [inf]  	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:896) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.126150462Z [inf]  	at org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:87) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.126154342Z [inf]  	at org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:1089) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.126157652Z [inf]  	at org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:979) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.126161162Z [inf]  	at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:1014) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.126165881Z [inf]  	at org.springframework.web.servlet.FrameworkServlet.doPost(FrameworkServlet.java:914) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.126169331Z [inf]  	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:590) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:31.126172811Z [inf]  	at org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:885) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.126176861Z [inf]  	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:658) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:31.126179721Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:31.126458287Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:31.126461787Z [inf]  	at org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:51) ~[tomcat-embed-websocket-10.1.54.jar!/:na]
2026-08-12T18:00:31.126465766Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:31.126468906Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:31.126472076Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:110) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.126475766Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:31.126478846Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:31.126481906Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:108) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.126485316Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:108) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.126488636Z [inf]  	at org.springframework.security.web.FilterChainProxy.lambda$doFilterInternal$3(FilterChainProxy.java:231) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:31.126491686Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:370) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:31.126494646Z [inf]  	at org.springframework.security.web.access.intercept.AuthorizationFilter.doFilter(AuthorizationFilter.java:101) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:31.126787942Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:31.126795622Z [inf]  	at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:125) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:31.126804782Z [inf]  	at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:119) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:31.126808412Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:31.126811992Z [inf]  	at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:131) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:31.126815052Z [inf]  	at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:85) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:31.126818302Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:31.126821242Z [inf]  	at org.springframework.security.web.authentication.AnonymousAuthenticationFilter.doFilter(AnonymousAuthenticationFilter.java:100) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:31.126824981Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:31.126829171Z [inf]  	at org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter.doFilter(SecurityContextHolderAwareRequestFilter.java:179) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:31.127212515Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:31.127215835Z [inf]  	at org.springframework.security.web.savedrequest.RequestCacheAwareFilter.doFilter(RequestCacheAwareFilter.java:63) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:31.127219275Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:31.127222365Z [inf]  	at com.jeevan.smart_notes_api.security.jwt.JwtFilter.doFilterInternal(JwtFilter.java:74) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T18:00:31.127225815Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.127229095Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:31.127233015Z [inf]  	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:107) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:31.127235905Z [inf]  	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:93) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:31.127238915Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:31.127242464Z [inf]  	at org.springframework.web.filter.CorsFilter.doFilterInternal(CorsFilter.java:91) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.127245714Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.127248744Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:31.127728826Z [inf]  	at org.springframework.security.web.header.HeaderWriterFilter.doHeadersAfter(HeaderWriterFilter.java:90) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:31.127736296Z [inf]  	at org.springframework.security.web.header.HeaderWriterFilter.doFilterInternal(HeaderWriterFilter.java:75) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:31.127740846Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.127744486Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:31.127748716Z [inf]  	at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:82) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:31.127755456Z [inf]  	at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:69) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:31.127759296Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:31.127763046Z [inf]  	at org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter.doFilterInternal(WebAsyncManagerIntegrationFilter.java:62) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:31.127766806Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.127770916Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:31.127775026Z [inf]  	at org.springframework.security.web.session.DisableEncodeUrlFilter.doFilterInternal(DisableEncodeUrlFilter.java:42) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:31.128126890Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.128132330Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:31.128135960Z [inf]  	at org.springframework.security.web.FilterChainProxy.doFilterInternal(FilterChainProxy.java:233) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:31.128139510Z [inf]  	at org.springframework.security.web.FilterChainProxy.doFilter(FilterChainProxy.java:191) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:31.128142719Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.128145479Z [inf]  	at org.springframework.web.filter.ServletRequestPathFilter.doFilter(ServletRequestPathFilter.java:52) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.128148199Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.128151569Z [inf]  	at org.springframework.web.filter.CompositeFilter.doFilter(CompositeFilter.java:74) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.128155099Z [inf]  	at org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration$CompositeFilterChainProxy.doFilter(WebSecurityConfiguration.java:319) ~[spring-security-config-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:31.128158659Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.128162159Z [inf]  	at org.springframework.web.servlet.handler.HandlerMappingIntrospector.lambda$createCacheFilter$4(HandlerMappingIntrospector.java:267) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.128491924Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.128494654Z [inf]  	at org.springframework.web.filter.CompositeFilter.doFilter(CompositeFilter.java:74) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.128498534Z [inf]  	at org.springframework.security.config.annotation.web.configuration.WebMvcSecurityConfiguration$CompositeFilterChainProxy.doFilter(WebMvcSecurityConfiguration.java:240) ~[spring-security-config-6.5.10.jar!/:6.5.10]
2026-08-12T18:00:31.128501463Z [inf]  	at org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:362) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.128504273Z [inf]  	at org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:278) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.128507123Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:31.128510013Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:31.128512483Z [inf]  	at org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:100) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.128514693Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.128517423Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:31.128520103Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:31.128523003Z [inf]  	at org.springframework.web.filter.FormContentFilter.doFilterInternal(FormContentFilter.java:93) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.128972576Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.128980285Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:31.128983755Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:31.128987215Z [inf]  	at org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:201) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.128990905Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.128994445Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:31.128997405Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:31.129000355Z [inf]  	at org.springframework.web.filter.ForwardedHeaderFilter.doFilterInternal(ForwardedHeaderFilter.java:173) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.129003075Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T18:00:31.129005925Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:31.129008895Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:31.129197582Z [inf]  	at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:165) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:31.129200822Z [inf]  	at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:88) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:31.129204052Z [inf]  	at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:492) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:31.129207022Z [inf]  	at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:113) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:31.129209542Z [inf]  	at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:83) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:31.129212202Z [inf]  	at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:72) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:31.129215232Z [inf]  	at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:342) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:31.129217362Z [inf]  	at org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:399) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:31.129219651Z [inf]  	at org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:63) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:31.129222052Z [inf]  	at org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:903) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:31.129224572Z [inf]  	at org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1797) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:31.129226812Z [inf]  	at org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:52) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:31.129229282Z [inf]  	at org.apache.tomcat.util.threads.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:973) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:31.129540237Z [inf]  	at org.apache.tomcat.util.threads.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:491) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:31.129544317Z [inf]  	at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:63) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T18:00:31.129547387Z [inf]  	at java.base/java.lang.Thread.run(Unknown Source) ~[na:na]
2026-08-12T18:00:31.129549977Z [inf]  
2026-08-12T18:00:31.275860564Z [err]  	at com.jeevan.smart_notes_api.service.SubscriptionService$$SpringCGLIB$$0.createCheckoutSession(<generated>)
2026-08-12T18:00:31.275863913Z [err]  java.lang.RuntimeException: Failed to create Razorpay subscription
2026-08-12T18:00:31.275864133Z [err]  	at com.jeevan.smart_notes_api.controller.SubscriptionController.createCheckoutSession(SubscriptionController.java:60)
2026-08-12T18:00:31.275869473Z [err]  	at com.jeevan.smart_notes_api.service.RazorpayService.createSubscription(RazorpayService.java:78)
2026-08-12T18:00:31.275872703Z [err]  	at com.jeevan.smart_notes_api.service.SubscriptionService.createCheckoutSession(SubscriptionService.java:183)
2026-08-12T18:00:31.275876433Z [err]  	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(Unknown Source)
2026-08-12T18:00:31.275881793Z [err]  	at java.base/java.lang.reflect.Method.invoke(Unknown Source)
2026-08-12T18:00:31.275886133Z [err]  	at org.springframework.aop.support.AopUtils.invokeJoinpointUsingReflection(AopUtils.java:360)
2026-08-12T18:00:31.275889233Z [err]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.invokeJoinpoint(ReflectiveMethodInvocation.java:196)
2026-08-12T18:00:31.275892183Z [err]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:163)
2026-08-12T18:00:31.275895503Z [err]  	at org.springframework.transaction.interceptor.TransactionAspectSupport.invokeWithinTransaction(TransactionAspectSupport.java:380)
2026-08-12T18:00:31.275898723Z [err]  	at org.springframework.transaction.interceptor.TransactionInterceptor.invoke(TransactionInterceptor.java:119)
2026-08-12T18:00:31.275901823Z [err]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:184)
2026-08-12T18:00:31.275905583Z [err]  	at org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:728)
2026-08-12T18:00:31.276455304Z [err]  	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(Unknown Source)
2026-08-12T18:00:31.276461083Z [err]  	at java.base/java.lang.reflect.Method.invoke(Unknown Source)
2026-08-12T18:00:31.276464973Z [err]  	at org.springframework.web.method.support.InvocableHandlerMethod.doInvoke(InvocableHandlerMethod.java:258)
2026-08-12T18:00:31.276467993Z [err]  	at org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:191)
2026-08-12T18:00:31.276471303Z [err]  	at org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:118)
2026-08-12T18:00:31.276474223Z [err]  	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:991)
2026-08-12T18:00:31.276477263Z [err]  	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:896)
2026-08-12T18:00:31.276480193Z [err]  	at org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:87)
2026-08-12T18:00:31.276484843Z [err]  	at org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:1089)
2026-08-12T18:00:31.276488073Z [err]  	at org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:979)
2026-08-12T18:00:31.276491113Z [err]  	at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:1014)
2026-08-12T18:00:31.276494063Z [err]  	at org.springframework.web.servlet.FrameworkServlet.doPost(FrameworkServlet.java:914)
2026-08-12T18:00:31.276496803Z [err]  	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:590)
2026-08-12T18:00:31.276499903Z [err]  	at org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:885)
2026-08-12T18:00:31.276663910Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:370)
2026-08-12T18:00:31.276672060Z [err]  	at org.springframework.security.web.access.intercept.AuthorizationFilter.doFilter(AuthorizationFilter.java:101)
2026-08-12T18:00:31.276677300Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T18:00:31.276687430Z [err]  	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:658)
2026-08-12T18:00:31.276692440Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)
2026-08-12T18:00:31.276698000Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T18:00:31.276702049Z [err]  	at org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:51)
2026-08-12T18:00:31.276706919Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T18:00:31.276711319Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T18:00:31.276715539Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:110)
2026-08-12T18:00:31.276720609Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T18:00:31.276724579Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T18:00:31.276728689Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:108)
2026-08-12T18:00:31.276732889Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:108)
2026-08-12T18:00:31.276737429Z [err]  	at org.springframework.security.web.FilterChainProxy.lambda$doFilterInternal$3(FilterChainProxy.java:231)
2026-08-12T18:00:31.277338289Z [err]  	at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:125)
2026-08-12T18:00:31.277342039Z [err]  	at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:119)
2026-08-12T18:00:31.277345499Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T18:00:31.277350099Z [err]  	at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:131)
2026-08-12T18:00:31.277353429Z [err]  	at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:85)
2026-08-12T18:00:31.277356539Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T18:00:31.277360018Z [err]  	at org.springframework.security.web.authentication.AnonymousAuthenticationFilter.doFilter(AnonymousAuthenticationFilter.java:100)
2026-08-12T18:00:31.277363308Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T18:00:31.277367258Z [err]  	at org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter.doFilter(SecurityContextHolderAwareRequestFilter.java:179)
2026-08-12T18:00:31.277370398Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T18:00:31.277373688Z [err]  	at org.springframework.security.web.savedrequest.RequestCacheAwareFilter.doFilter(RequestCacheAwareFilter.java:63)
2026-08-12T18:00:31.277376818Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T18:00:31.277379778Z [err]  	at com.jeevan.smart_notes_api.security.jwt.JwtFilter.doFilterInternal(JwtFilter.java:74)
2026-08-12T18:00:31.277661404Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T18:00:31.277673924Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T18:00:31.277679454Z [err]  	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:107)
2026-08-12T18:00:31.277688524Z [err]  	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:93)
2026-08-12T18:00:31.277692934Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T18:00:31.277698494Z [err]  	at org.springframework.web.filter.CorsFilter.doFilterInternal(CorsFilter.java:91)
2026-08-12T18:00:31.277702314Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T18:00:31.277712454Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T18:00:31.277716224Z [err]  	at org.springframework.security.web.header.HeaderWriterFilter.doHeadersAfter(HeaderWriterFilter.java:90)
2026-08-12T18:00:31.277720443Z [err]  	at org.springframework.security.web.header.HeaderWriterFilter.doFilterInternal(HeaderWriterFilter.java:75)
2026-08-12T18:00:31.277723673Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T18:00:31.277727523Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T18:00:31.277731133Z [err]  	at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:82)
2026-08-12T18:00:31.277734733Z [err]  	at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:69)
2026-08-12T18:00:31.277787822Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T18:00:31.277792882Z [err]  	at org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter.doFilterInternal(WebAsyncManagerIntegrationFilter.java:62)
2026-08-12T18:00:31.277796822Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T18:00:31.277800502Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T18:00:31.277803672Z [err]  	at org.springframework.security.web.session.DisableEncodeUrlFilter.doFilterInternal(DisableEncodeUrlFilter.java:42)
2026-08-12T18:00:31.277806832Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T18:00:31.277809862Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T18:00:31.277812812Z [err]  	at org.springframework.security.web.FilterChainProxy.doFilterInternal(FilterChainProxy.java:233)
2026-08-12T18:00:31.277816842Z [err]  	at org.springframework.security.web.FilterChainProxy.doFilter(FilterChainProxy.java:191)
2026-08-12T18:00:31.277820312Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113)
2026-08-12T18:00:31.277823052Z [err]  	at org.springframework.web.filter.ServletRequestPathFilter.doFilter(ServletRequestPathFilter.java:52)
2026-08-12T18:00:31.277825952Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113)
2026-08-12T18:00:31.277829042Z [err]  	at org.springframework.web.filter.CompositeFilter.doFilter(CompositeFilter.java:74)
2026-08-12T18:00:31.277832172Z [err]  	at org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration$CompositeFilterChainProxy.doFilter(WebSecurityConfiguration.java:319)
2026-08-12T18:00:31.278019458Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T18:00:31.278023028Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113)
2026-08-12T18:00:31.278024608Z [err]  	at org.springframework.web.filter.FormContentFilter.doFilterInternal(FormContentFilter.java:93)
2026-08-12T18:00:31.278026828Z [err]  	at org.springframework.web.servlet.handler.HandlerMappingIntrospector.lambda$createCacheFilter$4(HandlerMappingIntrospector.java:267)
2026-08-12T18:00:31.278029418Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113)
2026-08-12T18:00:31.278031768Z [err]  	at org.springframework.web.filter.CompositeFilter.doFilter(CompositeFilter.java:74)
2026-08-12T18:00:31.278034328Z [err]  	at org.springframework.security.config.annotation.web.configuration.WebMvcSecurityConfiguration$CompositeFilterChainProxy.doFilter(WebMvcSecurityConfiguration.java:240)
2026-08-12T18:00:31.278036978Z [err]  	at org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:362)
2026-08-12T18:00:31.278039408Z [err]  	at org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:278)
2026-08-12T18:00:31.278041508Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T18:00:31.278044948Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T18:00:31.278047288Z [err]  	at org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:100)
2026-08-12T18:00:31.278049888Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T18:00:31.278052328Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T18:00:31.278490831Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T18:00:31.278497171Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T18:00:31.278500830Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T18:00:31.278503840Z [err]  	at org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:201)
2026-08-12T18:00:31.278507090Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T18:00:31.278510350Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T18:00:31.278513850Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T18:00:31.278518840Z [err]  	at org.springframework.web.filter.ForwardedHeaderFilter.doFilterInternal(ForwardedHeaderFilter.java:173)
2026-08-12T18:00:31.278527090Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T18:00:31.278530540Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T18:00:31.278533790Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T18:00:31.278536800Z [err]  	at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:165)
2026-08-12T18:00:31.278539860Z [err]  	at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:88)
2026-08-12T18:00:31.278542780Z [err]  	at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:492)
2026-08-12T18:00:31.278545810Z [err]  	at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:113)
2026-08-12T18:00:31.278997192Z [err]  	at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:83)
2026-08-12T18:00:31.279001752Z [err]  	at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:72)
2026-08-12T18:00:31.279004892Z [err]  	at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:342)
2026-08-12T18:00:31.279008152Z [err]  	at org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:399)
2026-08-12T18:00:31.279013922Z [err]  	at org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:63)
2026-08-12T18:00:31.279017292Z [err]  	at org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:903)
2026-08-12T18:00:31.279020522Z [err]  	at org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1797)
2026-08-12T18:00:31.279023832Z [err]  	at org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:52)
2026-08-12T18:00:31.279027162Z [err]  	at org.apache.tomcat.util.threads.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:973)
2026-08-12T18:00:31.279029982Z [err]  	at org.apache.tomcat.util.threads.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:491)
2026-08-12T18:00:31.279032572Z [err]  	at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:63)
2026-08-12T18:00:31.279036671Z [err]  	at java.base/java.lang.Thread.run(Unknown Source)
2026-08-12T18:00:31.279040711Z [err]  Caused by: com.razorpay.RazorpayException: BAD_REQUEST_ERROR:The ID provided is invalid or could not be found.
2026-08-12T18:00:31.279043691Z [err]  	at com.razorpay.ApiClient.throwException(ApiClient.java:228)
2026-08-12T18:00:31.279046741Z [err]  	at com.razorpay.ApiClient.processResponse(ApiClient.java:180)
2026-08-12T18:00:31.279049511Z [err]  	at com.razorpay.ApiClient.post(ApiClient.java:55)
2026-08-12T18:00:31.279052271Z [err]  	at com.razorpay.SubscriptionClient.post(SubscriptionClient.java:7)
2026-08-12T18:00:31.279239228Z [err]  	at com.razorpay.ApiClient.post(ApiClient.java:50)
2026-08-12T18:00:31.279242738Z [err]  	at com.razorpay.SubscriptionClient.post(SubscriptionClient.java:7)
2026-08-12T18:00:31.279246138Z [err]  	at com.razorpay.SubscriptionClient.create(SubscriptionClient.java:14)
2026-08-12T18:00:31.279249688Z [err]  	at com.jeevan.smart_notes_api.service.RazorpayService.createSubscription(RazorpayService.java:75)
2026-08-12T18:00:31.279252688Z [err]  	... 123 more
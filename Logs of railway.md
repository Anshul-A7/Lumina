2026-08-12T17:43:06.647095586Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:43:06.647101876Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:43:06.647107796Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:43:06.647108186Z [err]  	at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:82)
2026-08-12T17:43:06.647114126Z [err]  	at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:69)
2026-08-12T17:43:06.647116346Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:43:06.647120086Z [err]  	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:107)
2026-08-12T17:43:06.647123146Z [err]  	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:93)
2026-08-12T17:43:06.647126556Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:43:06.647130806Z [err]  	at org.springframework.web.filter.CorsFilter.doFilterInternal(CorsFilter.java:91)
2026-08-12T17:43:06.647135406Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:43:06.647139226Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:43:06.647143815Z [err]  	at org.springframework.security.web.header.HeaderWriterFilter.doHeadersAfter(HeaderWriterFilter.java:90)
2026-08-12T17:43:06.647148585Z [err]  	at org.springframework.security.web.header.HeaderWriterFilter.doFilterInternal(HeaderWriterFilter.java:75)
2026-08-12T17:43:06.647590519Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:43:06.647597209Z [err]  	at org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter.doFilterInternal(WebAsyncManagerIntegrationFilter.java:62)
2026-08-12T17:43:06.647601359Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:43:06.647605019Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:43:06.647608939Z [err]  	at org.springframework.security.web.session.DisableEncodeUrlFilter.doFilterInternal(DisableEncodeUrlFilter.java:42)
2026-08-12T17:43:06.647612979Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:43:06.647616429Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:43:06.647619899Z [err]  	at org.springframework.security.web.FilterChainProxy.doFilterInternal(FilterChainProxy.java:233)
2026-08-12T17:43:06.647624059Z [err]  	at org.springframework.security.web.FilterChainProxy.doFilter(FilterChainProxy.java:191)
2026-08-12T17:43:06.647627999Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113)
2026-08-12T17:43:06.647631429Z [err]  	at org.springframework.web.filter.ServletRequestPathFilter.doFilter(ServletRequestPathFilter.java:52)
2026-08-12T17:43:06.647634879Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113)
2026-08-12T17:43:06.647638318Z [err]  	at org.springframework.web.filter.CompositeFilter.doFilter(CompositeFilter.java:74)
2026-08-12T17:43:06.647641988Z [err]  	at org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration$CompositeFilterChainProxy.doFilter(WebSecurityConfiguration.java:319)
2026-08-12T17:43:06.648359170Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113)
2026-08-12T17:43:06.648364240Z [err]  	at org.springframework.web.servlet.handler.HandlerMappingIntrospector.lambda$createCacheFilter$4(HandlerMappingIntrospector.java:267)
2026-08-12T17:43:06.648369060Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113)
2026-08-12T17:43:06.648372640Z [err]  	at org.springframework.web.filter.CompositeFilter.doFilter(CompositeFilter.java:74)
2026-08-12T17:43:06.648376039Z [err]  	at org.springframework.security.config.annotation.web.configuration.WebMvcSecurityConfiguration$CompositeFilterChainProxy.doFilter(WebMvcSecurityConfiguration.java:240)
2026-08-12T17:43:06.648379189Z [err]  	at org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:362)
2026-08-12T17:43:06.648382979Z [err]  	at org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:278)
2026-08-12T17:43:06.648386389Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:43:06.648389389Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:43:06.648392919Z [err]  	at org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:100)
2026-08-12T17:43:06.648396379Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:43:06.648399639Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:43:06.648403309Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:43:06.648406949Z [err]  	at org.springframework.web.filter.FormContentFilter.doFilterInternal(FormContentFilter.java:93)
2026-08-12T17:43:06.648693166Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:43:06.648696776Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:43:06.648700096Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:43:06.648703966Z [err]  	at org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:201)
2026-08-12T17:43:06.648707075Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:43:06.648709915Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:43:06.648712835Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:43:06.648715555Z [err]  	at org.springframework.web.filter.ForwardedHeaderFilter.doFilterInternal(ForwardedHeaderFilter.java:173)
2026-08-12T17:43:06.648718145Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:43:06.648720705Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:43:06.648723875Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:43:06.648726685Z [err]  	at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:165)
2026-08-12T17:43:06.648729865Z [err]  	at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:88)
2026-08-12T17:43:06.648732815Z [err]  	at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:492)
2026-08-12T17:43:06.648735605Z [err]  	at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:113)
2026-08-12T17:43:06.649179380Z [err]  	at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:83)
2026-08-12T17:43:06.649185000Z [err]  	at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:72)
2026-08-12T17:43:06.649189480Z [err]  	at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:342)
2026-08-12T17:43:06.649193080Z [err]  	at org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:399)
2026-08-12T17:43:06.649196490Z [err]  	at org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:63)
2026-08-12T17:43:06.649200139Z [err]  	at org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:903)
2026-08-12T17:43:06.649203709Z [err]  	at org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1797)
2026-08-12T17:43:06.649206949Z [err]  	at org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:52)
2026-08-12T17:43:06.649210599Z [err]  	at org.apache.tomcat.util.threads.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:973)
2026-08-12T17:43:06.649214229Z [err]  	at org.apache.tomcat.util.threads.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:491)
2026-08-12T17:43:06.649217739Z [err]  	at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:63)
2026-08-12T17:43:06.649221349Z [err]  	at java.base/java.lang.Thread.run(Unknown Source)
2026-08-12T17:43:06.649224709Z [err]  Caused by: com.razorpay.RazorpayException: BAD_REQUEST_ERROR:The ID provided is invalid or could not be found.
2026-08-12T17:43:06.649228169Z [err]  	at com.razorpay.ApiClient.throwException(ApiClient.java:228)
2026-08-12T17:43:06.649231709Z [err]  	at com.razorpay.ApiClient.processResponse(ApiClient.java:180)
2026-08-12T17:43:06.649235129Z [err]  	at com.razorpay.ApiClient.post(ApiClient.java:55)
2026-08-12T17:43:06.649238369Z [err]  	at com.razorpay.SubscriptionClient.post(SubscriptionClient.java:7)
2026-08-12T17:43:06.649569845Z [err]  	at com.razorpay.ApiClient.post(ApiClient.java:50)
2026-08-12T17:43:06.649572725Z [err]  	at com.razorpay.SubscriptionClient.post(SubscriptionClient.java:7)
2026-08-12T17:43:06.649575525Z [err]  	at com.razorpay.SubscriptionClient.create(SubscriptionClient.java:14)
2026-08-12T17:43:06.649579115Z [err]  	at com.jeevan.smart_notes_api.service.RazorpayService.createSubscription(RazorpayService.java:75)
2026-08-12T17:43:06.649582345Z [err]  	... 123 more
2026-08-12T17:43:08.379344217Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:43:08.876817935Z [inf]  Hibernate: select rt1_0.id,rt1_0.email,rt1_0.expiry_date,rt1_0.token from refresh_tokens rt1_0 where rt1_0.token=?
2026-08-12T17:43:08.948947652Z [inf]  Hibernate: delete from refresh_tokens where id=?
2026-08-12T17:43:08.948954172Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:43:09.300262521Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:43:10.618575757Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:43:10.939528877Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:43:11.598112817Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:43:11.598118427Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:43:11.598122687Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:43:11.598127357Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:43:11.598131097Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:43:11.778259921Z [inf]  Hibernate: select cs1_0.id,cs1_0.created_at,cs1_0.pinned,cs1_0.title,cs1_0.updated_at,cs1_0.user_id from chat_sessions cs1_0 left join users u1_0 on u1_0.id=cs1_0.user_id where u1_0.email=? order by cs1_0.updated_at desc
2026-08-12T17:43:11.922071488Z [inf]  Hibernate: select n1_0.id,n1_0.content,n1_0.created_at,n1_0.title,n1_0.user_id from notes n1_0 left join users u1_0 on u1_0.id=n1_0.user_id where u1_0.email=?
2026-08-12T17:43:11.929852961Z [inf]  Hibernate: select n1_0.id,n1_0.created_at,n1_0.description,n1_0.is_read,n1_0.title,n1_0.type,n1_0.user_id from notifications n1_0 where n1_0.user_id=? order by n1_0.created_at desc
2026-08-12T17:43:11.950038799Z [inf]  Hibernate: select s1_0.id,s1_0.active,s1_0.billing_cycle,s1_0.cancel_at_cycle_end,s1_0.created_at,s1_0.current_period_end,s1_0.current_period_start,s1_0.end_date,s1_0.plan,s1_0.razorpay_plan_id,s1_0.razorpay_subscription_id,s1_0.start_date,s1_0.status,s1_0.updated_at,s1_0.user_id from subscriptions s1_0 left join users u1_0 on u1_0.id=s1_0.user_id where u1_0.email=?
2026-08-12T17:43:11.957629434Z [inf]  Hibernate: select s1_0.id,s1_0.active,s1_0.billing_cycle,s1_0.cancel_at_cycle_end,s1_0.created_at,s1_0.current_period_end,s1_0.current_period_start,s1_0.end_date,s1_0.plan,s1_0.razorpay_plan_id,s1_0.razorpay_subscription_id,s1_0.start_date,s1_0.status,s1_0.updated_at,s1_0.user_id from subscriptions s1_0 left join users u1_0 on u1_0.id=s1_0.user_id where u1_0.email=?
2026-08-12T17:43:12.140988286Z [inf]  Hibernate: select ut1_0.id,ut1_0.ai_requests,ut1_0.images_attached,ut1_0.images_generated,ut1_0.pdfs_attached,ut1_0.pdfs_generated,ut1_0.usage_date,ut1_0.user_id from usage_tracker ut1_0 left join users u1_0 on u1_0.id=ut1_0.user_id where u1_0.email=? and ut1_0.usage_date=?
2026-08-12T17:43:12.141524480Z [inf]  Hibernate: select s1_0.id,s1_0.active,s1_0.billing_cycle,s1_0.cancel_at_cycle_end,s1_0.created_at,s1_0.current_period_end,s1_0.current_period_start,s1_0.end_date,s1_0.plan,s1_0.razorpay_plan_id,s1_0.razorpay_subscription_id,s1_0.start_date,s1_0.status,s1_0.updated_at,s1_0.user_id from subscriptions s1_0 left join users u1_0 on u1_0.id=s1_0.user_id where u1_0.email=?
2026-08-12T17:43:12.353955829Z [inf]  Hibernate: select ut1_0.id,ut1_0.ai_requests,ut1_0.images_attached,ut1_0.images_generated,ut1_0.pdfs_attached,ut1_0.pdfs_generated,ut1_0.usage_date,ut1_0.user_id from usage_tracker ut1_0 left join users u1_0 on u1_0.id=ut1_0.user_id where u1_0.email=? and ut1_0.usage_date=?
2026-08-12T17:43:14.586811329Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:43:14.937863651Z [inf]  Hibernate: select s1_0.id,s1_0.active,s1_0.billing_cycle,s1_0.cancel_at_cycle_end,s1_0.created_at,s1_0.current_period_end,s1_0.current_period_start,s1_0.end_date,s1_0.plan,s1_0.razorpay_plan_id,s1_0.razorpay_subscription_id,s1_0.start_date,s1_0.status,s1_0.updated_at,s1_0.user_id from subscriptions s1_0 left join users u1_0 on u1_0.id=s1_0.user_id where u1_0.email=?
2026-08-12T17:43:15.084557224Z [inf]  Hibernate: select s1_0.id,s1_0.active,s1_0.billing_cycle,s1_0.cancel_at_cycle_end,s1_0.created_at,s1_0.current_period_end,s1_0.current_period_start,s1_0.end_date,s1_0.plan,s1_0.razorpay_plan_id,s1_0.razorpay_subscription_id,s1_0.start_date,s1_0.status,s1_0.updated_at,s1_0.user_id from subscriptions s1_0 left join users u1_0 on u1_0.id=s1_0.user_id where u1_0.email=?
2026-08-12T17:43:15.253523537Z [inf]  Hibernate: select ut1_0.id,ut1_0.ai_requests,ut1_0.images_attached,ut1_0.images_generated,ut1_0.pdfs_attached,ut1_0.pdfs_generated,ut1_0.usage_date,ut1_0.user_id from usage_tracker ut1_0 left join users u1_0 on u1_0.id=ut1_0.user_id where u1_0.email=? and ut1_0.usage_date=?
2026-08-12T17:43:16.580704192Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:43:16.966166264Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:43:17.296711603Z [inf]  Hibernate: update users set auth_provider=?,email=?,email_verified=?,password=?,profile_image_url=?,razorpay_customer_id=?,role=?,subscription_plan=?,updated_at=?,username=? where id=?
2026-08-12T17:43:17.490348877Z [inf]  Hibernate: select s1_0.id,s1_0.active,s1_0.billing_cycle,s1_0.cancel_at_cycle_end,s1_0.created_at,s1_0.current_period_end,s1_0.current_period_start,s1_0.end_date,s1_0.plan,s1_0.razorpay_plan_id,s1_0.razorpay_subscription_id,s1_0.start_date,s1_0.status,s1_0.updated_at,s1_0.user_id from subscriptions s1_0 left join users u1_0 on u1_0.id=s1_0.user_id where u1_0.email=?
2026-08-12T17:43:17.656809062Z [inf]  2026-08-12T17:43:17.655Z  INFO 1 --- [smart-notes-api] [nio-8080-exec-8] c.j.s.service.RazorpayService            : Creating Razorpay Subscription. CustomerID: 'cust_TOwdz60DMUABR6', PlanID: 'plan_TOuvcE0VB6FIrq'
2026-08-12T17:43:17.965593574Z [inf]  	at org.springframework.aop.support.AopUtils.invokeJoinpointUsingReflection(AopUtils.java:360) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.965610793Z [inf]  2026-08-12T17:43:17.865Z ERROR 1 --- [smart-notes-api] [nio-8080-exec-8] c.j.s.service.RazorpayService            : Failed to create Razorpay subscription for customer cust_TOwdz60DMUABR6 and plan plan_TOuvcE0VB6FIrq
2026-08-12T17:43:17.965613543Z [inf]  
2026-08-12T17:43:17.965616213Z [inf]  com.razorpay.RazorpayException: BAD_REQUEST_ERROR:The ID provided is invalid or could not be found.
2026-08-12T17:43:17.965619173Z [inf]  	at com.razorpay.ApiClient.throwException(ApiClient.java:228) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:43:17.965622223Z [inf]  	at com.razorpay.ApiClient.processResponse(ApiClient.java:180) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:43:17.965624873Z [inf]  	at com.razorpay.ApiClient.post(ApiClient.java:55) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:43:17.965627523Z [inf]  	at com.razorpay.SubscriptionClient.post(SubscriptionClient.java:7) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:43:17.965629923Z [inf]  	at com.razorpay.ApiClient.post(ApiClient.java:50) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:43:17.965632393Z [inf]  	at com.razorpay.SubscriptionClient.post(SubscriptionClient.java:7) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:43:17.965635083Z [inf]  	at com.razorpay.SubscriptionClient.create(SubscriptionClient.java:14) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:43:17.965638123Z [inf]  	at com.jeevan.smart_notes_api.service.RazorpayService.createSubscription(RazorpayService.java:75) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:43:17.965640813Z [inf]  	at com.jeevan.smart_notes_api.service.SubscriptionService.createCheckoutSession(SubscriptionService.java:178) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:43:17.965643753Z [inf]  	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(Unknown Source) ~[na:na]
2026-08-12T17:43:17.965646293Z [inf]  	at java.base/java.lang.reflect.Method.invoke(Unknown Source) ~[na:na]
2026-08-12T17:43:17.966135237Z [inf]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.invokeJoinpoint(ReflectiveMethodInvocation.java:196) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.966138047Z [inf]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:163) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.966140727Z [inf]  	at org.springframework.transaction.interceptor.TransactionAspectSupport.invokeWithinTransaction(TransactionAspectSupport.java:380) ~[spring-tx-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.966143227Z [inf]  	at org.springframework.transaction.interceptor.TransactionInterceptor.invoke(TransactionInterceptor.java:119) ~[spring-tx-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.966145907Z [inf]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:184) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.966148827Z [inf]  	at org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:728) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.966151587Z [inf]  	at com.jeevan.smart_notes_api.service.SubscriptionService$$SpringCGLIB$$0.createCheckoutSession(<generated>) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:43:17.966154237Z [inf]  	at com.jeevan.smart_notes_api.controller.SubscriptionController.createCheckoutSession(SubscriptionController.java:50) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:43:17.966156777Z [inf]  	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(Unknown Source) ~[na:na]
2026-08-12T17:43:17.966159587Z [inf]  	at java.base/java.lang.reflect.Method.invoke(Unknown Source) ~[na:na]
2026-08-12T17:43:17.966162627Z [inf]  	at org.springframework.web.method.support.InvocableHandlerMethod.doInvoke(InvocableHandlerMethod.java:258) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.966165377Z [inf]  	at org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:191) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.967307553Z [inf]  	at org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:118) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.967311703Z [inf]  	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:991) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.967315423Z [inf]  	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:896) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.967320043Z [inf]  	at org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:87) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.967323553Z [inf]  	at org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:1089) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.967327783Z [inf]  	at org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:979) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.967332543Z [inf]  	at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:1014) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.967336373Z [inf]  	at org.springframework.web.servlet.FrameworkServlet.doPost(FrameworkServlet.java:914) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.967339732Z [inf]  	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:590) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:43:17.967343442Z [inf]  	at org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:885) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.967346772Z [inf]  	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:658) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:43:17.967350012Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:43:17.968509837Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:43:17.968513887Z [inf]  	at org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:51) ~[tomcat-embed-websocket-10.1.54.jar!/:na]
2026-08-12T17:43:17.968517387Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:43:17.968521037Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:43:17.968524747Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:110) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.968528547Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:43:17.968532477Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:43:17.968538817Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:108) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.968542157Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:108) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.968545687Z [inf]  	at org.springframework.security.web.FilterChainProxy.lambda$doFilterInternal$3(FilterChainProxy.java:231) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:43:17.968549217Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:370) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:43:17.968553147Z [inf]  	at org.springframework.security.web.access.intercept.AuthorizationFilter.doFilter(AuthorizationFilter.java:101) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:43:17.969297148Z [inf]  	at org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter.doFilter(SecurityContextHolderAwareRequestFilter.java:179) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:43:17.969302428Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:43:17.969307238Z [inf]  	at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:125) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:43:17.969310968Z [inf]  	at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:119) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:43:17.969313868Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:43:17.969316668Z [inf]  	at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:131) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:43:17.969319408Z [inf]  	at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:85) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:43:17.969322248Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:43:17.969325678Z [inf]  	at org.springframework.security.web.authentication.AnonymousAuthenticationFilter.doFilter(AnonymousAuthenticationFilter.java:100) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:43:17.969329058Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:43:17.969973090Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:43:17.969975280Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:43:17.969976650Z [inf]  	at org.springframework.security.web.savedrequest.RequestCacheAwareFilter.doFilter(RequestCacheAwareFilter.java:63) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:43:17.969979530Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:43:17.969982580Z [inf]  	at com.jeevan.smart_notes_api.security.jwt.JwtFilter.doFilterInternal(JwtFilter.java:74) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:43:17.969985300Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.969988330Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:43:17.969991400Z [inf]  	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:107) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:43:17.969994090Z [inf]  	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:93) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:43:17.969999589Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:43:17.970002289Z [inf]  	at org.springframework.web.filter.CorsFilter.doFilterInternal(CorsFilter.java:91) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.970004679Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.970783329Z [inf]  	at org.springframework.security.web.header.HeaderWriterFilter.doHeadersAfter(HeaderWriterFilter.java:90) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:43:17.970786439Z [inf]  	at org.springframework.security.web.header.HeaderWriterFilter.doFilterInternal(HeaderWriterFilter.java:75) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:43:17.970789509Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.970792359Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:43:17.970795819Z [inf]  	at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:82) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:43:17.970798839Z [inf]  	at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:69) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:43:17.970801999Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:43:17.970805429Z [inf]  	at org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter.doFilterInternal(WebAsyncManagerIntegrationFilter.java:62) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:43:17.970808289Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.970811899Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:43:17.970814939Z [inf]  	at org.springframework.security.web.session.DisableEncodeUrlFilter.doFilterInternal(DisableEncodeUrlFilter.java:42) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:43:17.971795617Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.971802667Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:43:17.971807757Z [inf]  	at org.springframework.security.web.FilterChainProxy.doFilterInternal(FilterChainProxy.java:233) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:43:17.971811387Z [inf]  	at org.springframework.security.web.FilterChainProxy.doFilter(FilterChainProxy.java:191) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:43:17.971816286Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.971820286Z [inf]  	at org.springframework.web.filter.ServletRequestPathFilter.doFilter(ServletRequestPathFilter.java:52) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.971823936Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.971827406Z [inf]  	at org.springframework.web.filter.CompositeFilter.doFilter(CompositeFilter.java:74) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.971831896Z [inf]  	at org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration$CompositeFilterChainProxy.doFilter(WebSecurityConfiguration.java:319) ~[spring-security-config-6.5.10.jar!/:6.5.10]
2026-08-12T17:43:17.971836226Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.971840316Z [inf]  	at org.springframework.web.servlet.handler.HandlerMappingIntrospector.lambda$createCacheFilter$4(HandlerMappingIntrospector.java:267) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.973363927Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.973366817Z [inf]  	at org.springframework.web.filter.CompositeFilter.doFilter(CompositeFilter.java:74) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.973369587Z [inf]  	at org.springframework.security.config.annotation.web.configuration.WebMvcSecurityConfiguration$CompositeFilterChainProxy.doFilter(WebMvcSecurityConfiguration.java:240) ~[spring-security-config-6.5.10.jar!/:6.5.10]
2026-08-12T17:43:17.973372937Z [inf]  	at org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:362) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.973376466Z [inf]  	at org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:278) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.973379476Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:43:17.973382226Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:43:17.973385106Z [inf]  	at org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:100) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.973387566Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.973390016Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:43:17.973392716Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:43:17.973396026Z [inf]  	at org.springframework.web.filter.FormContentFilter.doFilterInternal(FormContentFilter.java:93) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.974050808Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.974054918Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:43:17.974058458Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:43:17.974061058Z [inf]  	at org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:201) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.974064328Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.974067048Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:43:17.974069668Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:43:17.974072158Z [inf]  	at org.springframework.web.filter.ForwardedHeaderFilter.doFilterInternal(ForwardedHeaderFilter.java:173) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.974074548Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:43:17.974076788Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:43:17.974079198Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:43:17.974949987Z [inf]  	at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:165) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:43:17.974956597Z [inf]  	at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:88) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:43:17.974962667Z [inf]  	at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:492) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:43:17.974966247Z [inf]  	at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:113) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:43:17.974969737Z [inf]  	at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:83) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:43:17.974973227Z [inf]  	at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:72) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:43:17.974976527Z [inf]  	at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:342) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:43:17.974980087Z [inf]  	at org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:399) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:43:17.974983307Z [inf]  	at org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:63) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:43:17.974987727Z [inf]  	at org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:903) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:43:17.974991617Z [inf]  	at org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1797) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:43:17.974995237Z [inf]  	at org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:52) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:43:17.974998747Z [inf]  	at org.apache.tomcat.util.threads.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:973) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:43:17.975681358Z [inf]  	at org.apache.tomcat.util.threads.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:491) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:43:17.975686098Z [inf]  	at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:63) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:43:17.975689698Z [inf]  	at java.base/java.lang.Thread.run(Unknown Source) ~[na:na]
2026-08-12T17:43:17.975693648Z [inf]  
2026-08-12T17:43:18.064950889Z [err]  	at org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:728)
2026-08-12T17:43:18.064957349Z [err]  java.lang.RuntimeException: Failed to create Razorpay subscription
2026-08-12T17:43:18.064961409Z [err]  	at com.jeevan.smart_notes_api.service.RazorpayService.createSubscription(RazorpayService.java:78)
2026-08-12T17:43:18.064961959Z [err]  	at com.jeevan.smart_notes_api.controller.SubscriptionController.createCheckoutSession(SubscriptionController.java:50)
2026-08-12T17:43:18.064964759Z [err]  	at com.jeevan.smart_notes_api.service.SubscriptionService.createCheckoutSession(SubscriptionService.java:178)
2026-08-12T17:43:18.064968049Z [err]  	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(Unknown Source)
2026-08-12T17:43:18.064972359Z [err]  	at java.base/java.lang.reflect.Method.invoke(Unknown Source)
2026-08-12T17:43:18.064975689Z [err]  	at org.springframework.aop.support.AopUtils.invokeJoinpointUsingReflection(AopUtils.java:360)
2026-08-12T17:43:18.064979529Z [err]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.invokeJoinpoint(ReflectiveMethodInvocation.java:196)
2026-08-12T17:43:18.064982579Z [err]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:163)
2026-08-12T17:43:18.064985609Z [err]  	at org.springframework.transaction.interceptor.TransactionAspectSupport.invokeWithinTransaction(TransactionAspectSupport.java:380)
2026-08-12T17:43:18.064988729Z [err]  	at org.springframework.transaction.interceptor.TransactionInterceptor.invoke(TransactionInterceptor.java:119)
2026-08-12T17:43:18.064992509Z [err]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:184)
2026-08-12T17:43:18.065975877Z [err]  	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(Unknown Source)
2026-08-12T17:43:18.065978327Z [err]  	at org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:885)
2026-08-12T17:43:18.065979927Z [err]  	at java.base/java.lang.reflect.Method.invoke(Unknown Source)
2026-08-12T17:43:18.065983267Z [err]  	at org.springframework.web.method.support.InvocableHandlerMethod.doInvoke(InvocableHandlerMethod.java:258)
2026-08-12T17:43:18.065986737Z [err]  	at org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:191)
2026-08-12T17:43:18.065990257Z [err]  	at org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:118)
2026-08-12T17:43:18.065994987Z [err]  	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:991)
2026-08-12T17:43:18.065998617Z [err]  	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:896)
2026-08-12T17:43:18.066001637Z [err]  	at org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:87)
2026-08-12T17:43:18.066005397Z [err]  	at org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:1089)
2026-08-12T17:43:18.066008427Z [err]  	at org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:979)
2026-08-12T17:43:18.066011787Z [err]  	at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:1014)
2026-08-12T17:43:18.066014876Z [err]  	at org.springframework.web.servlet.FrameworkServlet.doPost(FrameworkServlet.java:914)
2026-08-12T17:43:18.066018056Z [err]  	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:590)
2026-08-12T17:43:18.067085342Z [err]  	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:658)
2026-08-12T17:43:18.067088132Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:43:18.067089372Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)
2026-08-12T17:43:18.067092882Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:43:18.067096532Z [err]  	at org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:51)
2026-08-12T17:43:18.067100072Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:43:18.067104212Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:43:18.067107772Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:110)
2026-08-12T17:43:18.067111012Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:43:18.067114272Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:43:18.067118412Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:108)
2026-08-12T17:43:18.067122012Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:108)
2026-08-12T17:43:18.067125442Z [err]  	at org.springframework.security.web.FilterChainProxy.lambda$doFilterInternal$3(FilterChainProxy.java:231)
2026-08-12T17:43:18.067129732Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:370)
2026-08-12T17:43:18.067132452Z [err]  	at org.springframework.security.web.access.intercept.AuthorizationFilter.doFilter(AuthorizationFilter.java:101)
2026-08-12T17:43:18.067903143Z [err]  	at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:125)
2026-08-12T17:43:18.067907122Z [err]  	at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:119)
2026-08-12T17:43:18.067910882Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:43:18.067914862Z [err]  	at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:131)
2026-08-12T17:43:18.067918712Z [err]  	at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:85)
2026-08-12T17:43:18.067923082Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:43:18.067927222Z [err]  	at org.springframework.security.web.authentication.AnonymousAuthenticationFilter.doFilter(AnonymousAuthenticationFilter.java:100)
2026-08-12T17:43:18.067931092Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:43:18.067935742Z [err]  	at org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter.doFilter(SecurityContextHolderAwareRequestFilter.java:179)
2026-08-12T17:43:18.067939882Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:43:18.067944182Z [err]  	at org.springframework.security.web.savedrequest.RequestCacheAwareFilter.doFilter(RequestCacheAwareFilter.java:63)
2026-08-12T17:43:18.067948882Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:43:18.067953132Z [err]  	at com.jeevan.smart_notes_api.security.jwt.JwtFilter.doFilterInternal(JwtFilter.java:74)
2026-08-12T17:43:18.068742012Z [err]  	at org.springframework.security.web.header.HeaderWriterFilter.doHeadersAfter(HeaderWriterFilter.java:90)
2026-08-12T17:43:18.068742852Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:43:18.068747072Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:43:18.068747352Z [err]  	at org.springframework.security.web.header.HeaderWriterFilter.doFilterInternal(HeaderWriterFilter.java:75)
2026-08-12T17:43:18.068751372Z [err]  	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:107)
2026-08-12T17:43:18.068751932Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:43:18.068756382Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:43:18.068756612Z [err]  	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:93)
2026-08-12T17:43:18.068760512Z [err]  	at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:82)
2026-08-12T17:43:18.068760712Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:43:18.068764592Z [err]  	at org.springframework.web.filter.CorsFilter.doFilterInternal(CorsFilter.java:91)
2026-08-12T17:43:18.068764742Z [err]  	at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:69)
2026-08-12T17:43:18.068768002Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:43:18.068771972Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:43:18.069368645Z [err]  	at org.springframework.web.filter.ServletRequestPathFilter.doFilter(ServletRequestPathFilter.java:52)
2026-08-12T17:43:18.069370995Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:43:18.069374175Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113)
2026-08-12T17:43:18.069375495Z [err]  	at org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter.doFilterInternal(WebAsyncManagerIntegrationFilter.java:62)
2026-08-12T17:43:18.069378765Z [err]  	at org.springframework.web.filter.CompositeFilter.doFilter(CompositeFilter.java:74)
2026-08-12T17:43:18.069378775Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:43:18.069381975Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:43:18.069383465Z [err]  	at org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration$CompositeFilterChainProxy.doFilter(WebSecurityConfiguration.java:319)
2026-08-12T17:43:18.069385484Z [err]  	at org.springframework.security.web.session.DisableEncodeUrlFilter.doFilterInternal(DisableEncodeUrlFilter.java:42)
2026-08-12T17:43:18.069388954Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:43:18.069392474Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:43:18.069395994Z [err]  	at org.springframework.security.web.FilterChainProxy.doFilterInternal(FilterChainProxy.java:233)
2026-08-12T17:43:18.069399214Z [err]  	at org.springframework.security.web.FilterChainProxy.doFilter(FilterChainProxy.java:191)
2026-08-12T17:43:18.069402504Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113)
2026-08-12T17:43:18.069972976Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113)
2026-08-12T17:43:18.069977086Z [err]  	at org.springframework.web.servlet.handler.HandlerMappingIntrospector.lambda$createCacheFilter$4(HandlerMappingIntrospector.java:267)
2026-08-12T17:43:18.069980456Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113)
2026-08-12T17:43:18.069983726Z [err]  	at org.springframework.web.filter.CompositeFilter.doFilter(CompositeFilter.java:74)
2026-08-12T17:43:18.069987226Z [err]  	at org.springframework.security.config.annotation.web.configuration.WebMvcSecurityConfiguration$CompositeFilterChainProxy.doFilter(WebMvcSecurityConfiguration.java:240)
2026-08-12T17:43:18.069990716Z [err]  	at org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:362)
2026-08-12T17:43:18.069993876Z [err]  	at org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:278)
2026-08-12T17:43:18.069997466Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:43:18.070000766Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:43:18.070004256Z [err]  	at org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:100)
2026-08-12T17:43:18.070007456Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:43:18.070010996Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:43:18.070014836Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:43:18.070018226Z [err]  	at org.springframework.web.filter.FormContentFilter.doFilterInternal(FormContentFilter.java:93)
2026-08-12T17:43:18.070717827Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:43:18.070720197Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:43:18.070722457Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:43:18.070724347Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:43:18.070726367Z [err]  	at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:113)
2026-08-12T17:43:18.070726807Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:43:18.070728577Z [err]  	at org.springframework.web.filter.ForwardedHeaderFilter.doFilterInternal(ForwardedHeaderFilter.java:173)
2026-08-12T17:43:18.070730717Z [err]  	at org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:201)
2026-08-12T17:43:18.070734477Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:43:18.070738267Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:43:18.070741737Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:43:18.070746437Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:43:18.070779857Z [err]  	at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:165)
2026-08-12T17:43:18.070793706Z [err]  	at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:88)
2026-08-12T17:43:18.070804346Z [err]  	at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:492)
2026-08-12T17:43:18.071703095Z [err]  	at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:83)
2026-08-12T17:43:18.071706515Z [err]  	at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:72)
2026-08-12T17:43:18.071757405Z [err]  	at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:342)
2026-08-12T17:43:18.071759885Z [err]  	at org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:399)
2026-08-12T17:43:18.071762365Z [err]  	at org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:63)
2026-08-12T17:43:18.071764875Z [err]  	at org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:903)
2026-08-12T17:43:18.071767425Z [err]  	at org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1797)
2026-08-12T17:43:18.071769905Z [err]  	at org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:52)
2026-08-12T17:43:18.071772314Z [err]  	at org.apache.tomcat.util.threads.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:973)
2026-08-12T17:43:18.071774774Z [err]  	at org.apache.tomcat.util.threads.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:491)
2026-08-12T17:43:18.071776944Z [err]  	at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:63)
2026-08-12T17:43:18.071779754Z [err]  	at java.base/java.lang.Thread.run(Unknown Source)
2026-08-12T17:43:18.071782174Z [err]  Caused by: com.razorpay.RazorpayException: BAD_REQUEST_ERROR:The ID provided is invalid or could not be found.
2026-08-12T17:43:18.071784614Z [err]  	at com.razorpay.ApiClient.throwException(ApiClient.java:228)
2026-08-12T17:43:18.071790004Z [err]  	at com.razorpay.ApiClient.processResponse(ApiClient.java:180)
2026-08-12T17:43:18.071793024Z [err]  	at com.razorpay.ApiClient.post(ApiClient.java:55)
2026-08-12T17:43:18.071795574Z [err]  	at com.razorpay.SubscriptionClient.post(SubscriptionClient.java:7)
2026-08-12T17:43:18.072799711Z [err]  	at com.razorpay.ApiClient.post(ApiClient.java:50)
2026-08-12T17:43:18.072804361Z [err]  	at com.razorpay.SubscriptionClient.post(SubscriptionClient.java:7)
2026-08-12T17:43:18.072808271Z [err]  	at com.razorpay.SubscriptionClient.create(SubscriptionClient.java:14)
2026-08-12T17:43:18.072812141Z [err]  	at com.jeevan.smart_notes_api.service.RazorpayService.createSubscription(RazorpayService.java:75)
2026-08-12T17:43:18.072815531Z [err]  	... 123 more
2026-08-12T17:43:19.140180771Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:43:19.492077312Z [inf]  Hibernate: select rt1_0.id,rt1_0.email,rt1_0.expiry_date,rt1_0.token from refresh_tokens rt1_0 where rt1_0.token=?
2026-08-12T17:43:19.720577889Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:43:20.064223145Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:43:21.029708721Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:43:21.292048215Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:43:22.060254971Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:43:22.060269321Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:43:22.060344330Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:43:22.060346970Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:43:22.060349670Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:43:22.064434419Z [inf]  Hibernate: select n1_0.id,n1_0.content,n1_0.created_at,n1_0.title,n1_0.user_id from notes n1_0 left join users u1_0 on u1_0.id=n1_0.user_id where u1_0.email=?
2026-08-12T17:43:22.237339843Z [inf]  Hibernate: select cs1_0.id,cs1_0.created_at,cs1_0.pinned,cs1_0.title,cs1_0.updated_at,cs1_0.user_id from chat_sessions cs1_0 left join users u1_0 on u1_0.id=cs1_0.user_id where u1_0.email=? order by cs1_0.updated_at desc
2026-08-12T17:43:22.237343283Z [inf]  Hibernate: select s1_0.id,s1_0.active,s1_0.billing_cycle,s1_0.cancel_at_cycle_end,s1_0.created_at,s1_0.current_period_end,s1_0.current_period_start,s1_0.end_date,s1_0.plan,s1_0.razorpay_plan_id,s1_0.razorpay_subscription_id,s1_0.start_date,s1_0.status,s1_0.updated_at,s1_0.user_id from subscriptions s1_0 left join users u1_0 on u1_0.id=s1_0.user_id where u1_0.email=?
2026-08-12T17:43:22.269772037Z [inf]  Hibernate: select s1_0.id,s1_0.active,s1_0.billing_cycle,s1_0.cancel_at_cycle_end,s1_0.created_at,s1_0.current_period_end,s1_0.current_period_start,s1_0.end_date,s1_0.plan,s1_0.razorpay_plan_id,s1_0.razorpay_subscription_id,s1_0.start_date,s1_0.status,s1_0.updated_at,s1_0.user_id from subscriptions s1_0 left join users u1_0 on u1_0.id=s1_0.user_id where u1_0.email=?
2026-08-12T17:43:22.269779017Z [inf]  Hibernate: select n1_0.id,n1_0.created_at,n1_0.description,n1_0.is_read,n1_0.title,n1_0.type,n1_0.user_id from notifications n1_0 where n1_0.user_id=? order by n1_0.created_at desc
2026-08-12T17:43:22.408764876Z [inf]  Hibernate: select s1_0.id,s1_0.active,s1_0.billing_cycle,s1_0.cancel_at_cycle_end,s1_0.created_at,s1_0.current_period_end,s1_0.current_period_start,s1_0.end_date,s1_0.plan,s1_0.razorpay_plan_id,s1_0.razorpay_subscription_id,s1_0.start_date,s1_0.status,s1_0.updated_at,s1_0.user_id from subscriptions s1_0 left join users u1_0 on u1_0.id=s1_0.user_id where u1_0.email=?
2026-08-12T17:43:22.448892103Z [inf]  Hibernate: select ut1_0.id,ut1_0.ai_requests,ut1_0.images_attached,ut1_0.images_generated,ut1_0.pdfs_attached,ut1_0.pdfs_generated,ut1_0.usage_date,ut1_0.user_id from usage_tracker ut1_0 left join users u1_0 on u1_0.id=ut1_0.user_id where u1_0.email=? and ut1_0.usage_date=?
2026-08-12T17:43:22.596761871Z [inf]  Hibernate: select ut1_0.id,ut1_0.ai_requests,ut1_0.images_attached,ut1_0.images_generated,ut1_0.pdfs_attached,ut1_0.pdfs_generated,ut1_0.usage_date,ut1_0.user_id from usage_tracker ut1_0 left join users u1_0 on u1_0.id=ut1_0.user_id where u1_0.email=? and ut1_0.usage_date=?
2026-08-12T17:43:42.602685129Z [inf]  2026-08-12T17:43:38.621Z  INFO 1 --- [smart-notes-api] [nio-8080-exec-6] c.j.s.service.GoogleTokenVerifier        : [GoogleTokenVerifier] Successfully verified Google user: AexoTreX AI (anonymous.00367@gmail.com)
2026-08-12T17:43:42.602690569Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:43:42.602695749Z [inf]  Hibernate: select u1_0.id from users u1_0 where u1_0.username=? fetch first ? rows only
2026-08-12T17:43:42.602700169Z [inf]  Hibernate: insert into users (auth_provider,created_at,email,email_verified,password,profile_image_url,razorpay_customer_id,role,subscription_plan,updated_at,username) values (?,?,?,?,?,?,?,?,?,?,?)
2026-08-12T17:43:42.602703459Z [inf]  2026-08-12T17:43:39.553Z  INFO 1 --- [smart-notes-api] [nio-8080-exec-6] c.j.smart_notes_api.service.AuthService  : [AuthService] New Google user created: aexotrexai (anonymous.00367@gmail.com)
2026-08-12T17:43:45.460069635Z [inf]  2026-08-12T17:43:45.442Z  INFO 1 --- [smart-notes-api] [MessageBroker-1] o.s.w.s.c.WebSocketMessageBrokerStats    : WebSocketSession[0 current WS(0)-HttpStream(0)-HttpPoll(0), 0 total, 0 closed abnormally (0 connect failure, 0 send limit, 0 transport error)], stompSubProtocol[processed CONNECT(0)-CONNECTED(0)-DISCONNECT(0)], stompBrokerRelay[null], inboundChannel[pool size = 0, active threads = 0, queued tasks = 0, completed tasks = 0], outboundChannel[pool size = 0, active threads = 0, queued tasks = 0, completed tasks = 0], sockJsScheduler[pool size = 2, active threads = 1, queued tasks = 1, completed tasks = 0]
2026-08-12T17:45:46.017329703Z [inf]  2026-08-12T17:45:45.785Z  INFO 1 --- [smart-notes-api] [io-8080-exec-10] c.j.s.service.GoogleTokenVerifier        : [GoogleTokenVerifier] Successfully verified Google user: AexoTreX AI (anonymous.00367@gmail.com)
2026-08-12T17:45:46.017336663Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:45:46.161514526Z [inf]  2026-08-12T17:45:46.152Z  INFO 1 --- [smart-notes-api] [io-8080-exec-10] c.j.smart_notes_api.service.AuthService  : [AuthService] Google user logged in: anonymous.00367@gmail.com
2026-08-12T17:45:46.172478069Z [inf]  Hibernate: select rt1_0.id,rt1_0.email,rt1_0.expiry_date,rt1_0.token from refresh_tokens rt1_0 where rt1_0.email=?
2026-08-12T17:45:46.385108645Z [inf]  Hibernate: insert into refresh_tokens (email,expiry_date,token) values (?,?,?)
2026-08-12T17:45:47.781004226Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:45:48.033644161Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:45:48.812167897Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:45:48.812171767Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:45:48.812175417Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:45:48.812180807Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:45:48.812184577Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:45:48.852366523Z [inf]  Hibernate: select n1_0.id,n1_0.created_at,n1_0.description,n1_0.is_read,n1_0.title,n1_0.type,n1_0.user_id from notifications n1_0 where n1_0.user_id=? order by n1_0.created_at desc
2026-08-12T17:45:49.022805268Z [inf]  Hibernate: select cs1_0.id,cs1_0.created_at,cs1_0.pinned,cs1_0.title,cs1_0.updated_at,cs1_0.user_id from chat_sessions cs1_0 left join users u1_0 on u1_0.id=cs1_0.user_id where u1_0.email=? order by cs1_0.updated_at desc
2026-08-12T17:45:49.022812658Z [inf]  Hibernate: select s1_0.id,s1_0.active,s1_0.billing_cycle,s1_0.cancel_at_cycle_end,s1_0.created_at,s1_0.current_period_end,s1_0.current_period_start,s1_0.end_date,s1_0.plan,s1_0.razorpay_plan_id,s1_0.razorpay_subscription_id,s1_0.start_date,s1_0.status,s1_0.updated_at,s1_0.user_id from subscriptions s1_0 left join users u1_0 on u1_0.id=s1_0.user_id where u1_0.email=?
2026-08-12T17:45:49.036477946Z [inf]  Hibernate: select n1_0.id,n1_0.content,n1_0.created_at,n1_0.title,n1_0.user_id from notes n1_0 left join users u1_0 on u1_0.id=n1_0.user_id where u1_0.email=?
2026-08-12T17:45:49.047529258Z [inf]  Hibernate: select s1_0.id,s1_0.active,s1_0.billing_cycle,s1_0.cancel_at_cycle_end,s1_0.created_at,s1_0.current_period_end,s1_0.current_period_start,s1_0.end_date,s1_0.plan,s1_0.razorpay_plan_id,s1_0.razorpay_subscription_id,s1_0.start_date,s1_0.status,s1_0.updated_at,s1_0.user_id from subscriptions s1_0 left join users u1_0 on u1_0.id=s1_0.user_id where u1_0.email=?
2026-08-12T17:45:49.205548848Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:45:49.244889215Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:45:49.362512582Z [inf]  Hibernate: insert into subscriptions (active,billing_cycle,cancel_at_cycle_end,created_at,current_period_end,current_period_start,end_date,plan,razorpay_plan_id,razorpay_subscription_id,start_date,status,updated_at,user_id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)
2026-08-12T17:45:49.411997752Z [inf]  Hibernate: insert into subscriptions (active,billing_cycle,cancel_at_cycle_end,created_at,current_period_end,current_period_start,end_date,plan,razorpay_plan_id,razorpay_subscription_id,start_date,status,updated_at,user_id) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)
2026-08-12T17:45:49.801814818Z [inf]  Hibernate: select s1_0.id,s1_0.active,s1_0.billing_cycle,s1_0.cancel_at_cycle_end,s1_0.created_at,s1_0.current_period_end,s1_0.current_period_start,s1_0.end_date,s1_0.plan,s1_0.razorpay_plan_id,s1_0.razorpay_subscription_id,s1_0.start_date,s1_0.status,s1_0.updated_at,s1_0.user_id from subscriptions s1_0 left join users u1_0 on u1_0.id=s1_0.user_id where u1_0.email=?
2026-08-12T17:45:49.801818188Z [inf]  2026-08-12T17:45:49.722Z  WARN 1 --- [smart-notes-api] [nio-8080-exec-8] o.h.engine.jdbc.spi.SqlExceptionHelper   : SQL Error: 0, SQLState: 23505
2026-08-12T17:45:49.801825348Z [inf]  2026-08-12T17:45:49.722Z ERROR 1 --- [smart-notes-api] [nio-8080-exec-8] o.h.engine.jdbc.spi.SqlExceptionHelper   : ERROR: duplicate key value violates unique constraint "idx_subscription_user"
2026-08-12T17:45:49.801828307Z [inf]    Detail: Key (user_id)=(2) already exists.
2026-08-12T17:45:49.876637910Z [inf]  Hibernate: select ut1_0.id,ut1_0.ai_requests,ut1_0.images_attached,ut1_0.images_generated,ut1_0.pdfs_attached,ut1_0.pdfs_generated,ut1_0.usage_date,ut1_0.user_id from usage_tracker ut1_0 left join users u1_0 on u1_0.id=ut1_0.user_id where u1_0.email=? and ut1_0.usage_date=?
2026-08-12T17:45:49.925486228Z [inf]  Hibernate: select s1_0.id,s1_0.active,s1_0.billing_cycle,s1_0.cancel_at_cycle_end,s1_0.created_at,s1_0.current_period_end,s1_0.current_period_start,s1_0.end_date,s1_0.plan,s1_0.razorpay_plan_id,s1_0.razorpay_subscription_id,s1_0.start_date,s1_0.status,s1_0.updated_at,s1_0.user_id from subscriptions s1_0 left join users u1_0 on u1_0.id=s1_0.user_id where u1_0.email=?
2026-08-12T17:45:50.038695680Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:45:50.106670839Z [inf]  Hibernate: select ut1_0.id,ut1_0.ai_requests,ut1_0.images_attached,ut1_0.images_generated,ut1_0.pdfs_attached,ut1_0.pdfs_generated,ut1_0.usage_date,ut1_0.user_id from usage_tracker ut1_0 left join users u1_0 on u1_0.id=ut1_0.user_id where u1_0.email=? and ut1_0.usage_date=?
2026-08-12T17:45:50.271636421Z [inf]  Hibernate: insert into usage_tracker (ai_requests,images_attached,images_generated,pdfs_attached,pdfs_generated,usage_date,user_id) values (?,?,?,?,?,?,?)
2026-08-12T17:45:50.281797624Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:45:50.471751654Z [inf]  Hibernate: insert into usage_tracker (ai_requests,images_attached,images_generated,pdfs_attached,pdfs_generated,usage_date,user_id) values (?,?,?,?,?,?,?)
2026-08-12T17:45:50.650466215Z [inf]  2026-08-12T17:45:50.646Z  WARN 1 --- [smart-notes-api] [nio-8080-exec-8] o.h.engine.jdbc.spi.SqlExceptionHelper   : SQL Error: 0, SQLState: 23505
2026-08-12T17:45:50.650469585Z [inf]  2026-08-12T17:45:50.646Z ERROR 1 --- [smart-notes-api] [nio-8080-exec-8] o.h.engine.jdbc.spi.SqlExceptionHelper   : ERROR: duplicate key value violates unique constraint "idx_usage_user_date"
2026-08-12T17:45:50.650473085Z [inf]    Detail: Key (user_id, usage_date)=(2, 2026-08-12) already exists.
2026-08-12T17:45:50.835467937Z [inf]  Hibernate: select ut1_0.id,ut1_0.ai_requests,ut1_0.images_attached,ut1_0.images_generated,ut1_0.pdfs_attached,ut1_0.pdfs_generated,ut1_0.usage_date,ut1_0.user_id from usage_tracker ut1_0 left join users u1_0 on u1_0.id=ut1_0.user_id where u1_0.email=? and ut1_0.usage_date=?
2026-08-12T17:45:53.554917345Z [inf]  2026-08-12T17:45:53.547Z  WARN 1 --- [smart-notes-api] [nio-8080-exec-6] c.j.smart_notes_api.service.AuthService  : [AuthService] Failed to send welcome email to anonymous.00367@gmail.com: Mail server connection failed. Failed messages: org.eclipse.angus.mail.util.MailConnectException: Couldn't connect to host, port: smtp.gmail.com, 587; timeout -1;
2026-08-12T17:45:53.554927135Z [inf]    nested exception is:
2026-08-12T17:45:53.554932345Z [inf]  	java.net.ConnectException: Operation timed out
2026-08-12T17:45:53.554936935Z [inf]  Hibernate: insert into user_settings (auto_title,default_model,theme,updated_at,user_id) values (?,?,?,?,?)
2026-08-12T17:45:53.922126165Z [inf]  Hibernate: insert into notifications (created_at,description,is_read,title,type,user_id) values (?,?,?,?,?,?)
2026-08-12T17:45:54.296301817Z [inf]  Hibernate: select rt1_0.id,rt1_0.email,rt1_0.expiry_date,rt1_0.token from refresh_tokens rt1_0 where rt1_0.email=?
2026-08-12T17:45:54.474156979Z [inf]  Hibernate: update refresh_tokens set email=?,expiry_date=?,token=? where id=?
2026-08-12T17:45:55.713403802Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:45:56.068116757Z [inf]  Hibernate: select s1_0.id,s1_0.active,s1_0.billing_cycle,s1_0.cancel_at_cycle_end,s1_0.created_at,s1_0.current_period_end,s1_0.current_period_start,s1_0.end_date,s1_0.plan,s1_0.razorpay_plan_id,s1_0.razorpay_subscription_id,s1_0.start_date,s1_0.status,s1_0.updated_at,s1_0.user_id from subscriptions s1_0 left join users u1_0 on u1_0.id=s1_0.user_id where u1_0.email=?
2026-08-12T17:45:56.256777374Z [inf]  Hibernate: select s1_0.id,s1_0.active,s1_0.billing_cycle,s1_0.cancel_at_cycle_end,s1_0.created_at,s1_0.current_period_end,s1_0.current_period_start,s1_0.end_date,s1_0.plan,s1_0.razorpay_plan_id,s1_0.razorpay_subscription_id,s1_0.start_date,s1_0.status,s1_0.updated_at,s1_0.user_id from subscriptions s1_0 left join users u1_0 on u1_0.id=s1_0.user_id where u1_0.email=?
2026-08-12T17:45:56.424903657Z [inf]  Hibernate: select ut1_0.id,ut1_0.ai_requests,ut1_0.images_attached,ut1_0.images_generated,ut1_0.pdfs_attached,ut1_0.pdfs_generated,ut1_0.usage_date,ut1_0.user_id from usage_tracker ut1_0 left join users u1_0 on u1_0.id=ut1_0.user_id where u1_0.email=? and ut1_0.usage_date=?
2026-08-12T17:47:06.690481431Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:47:06.690493681Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:47:06.690502321Z [inf]  Hibernate: update users set auth_provider=?,email=?,email_verified=?,password=?,profile_image_url=?,razorpay_customer_id=?,role=?,subscription_plan=?,updated_at=?,username=? where id=?
2026-08-12T17:47:06.690508451Z [inf]  Hibernate: select s1_0.id,s1_0.active,s1_0.billing_cycle,s1_0.cancel_at_cycle_end,s1_0.created_at,s1_0.current_period_end,s1_0.current_period_start,s1_0.end_date,s1_0.plan,s1_0.razorpay_plan_id,s1_0.razorpay_subscription_id,s1_0.start_date,s1_0.status,s1_0.updated_at,s1_0.user_id from subscriptions s1_0 left join users u1_0 on u1_0.id=s1_0.user_id where u1_0.email=?
2026-08-12T17:47:06.843223738Z [inf]  2026-08-12T17:47:06.780Z  INFO 1 --- [smart-notes-api] [nio-8080-exec-7] c.j.s.service.RazorpayService            : Creating Razorpay Subscription. CustomerID: 'cust_TOwi1E8QtJaYa0', PlanID: 'plan_TOuvcE0VB6FIrq'
2026-08-12T17:47:06.984628676Z [inf]  	at com.jeevan.smart_notes_api.service.SubscriptionService.createCheckoutSession(SubscriptionService.java:178) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:47:06.984637076Z [inf]  	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(Unknown Source) ~[na:na]
2026-08-12T17:47:06.984637926Z [inf]  2026-08-12T17:47:06.954Z ERROR 1 --- [smart-notes-api] [nio-8080-exec-7] c.j.s.service.RazorpayService            : Failed to create Razorpay subscription for customer cust_TOwi1E8QtJaYa0 and plan plan_TOuvcE0VB6FIrq
2026-08-12T17:47:06.984641306Z [inf]  
2026-08-12T17:47:06.984642306Z [inf]  	at java.base/java.lang.reflect.Method.invoke(Unknown Source) ~[na:na]
2026-08-12T17:47:06.984645456Z [inf]  com.razorpay.RazorpayException: BAD_REQUEST_ERROR:The ID provided is invalid or could not be found.
2026-08-12T17:47:06.984646766Z [inf]  	at org.springframework.aop.support.AopUtils.invokeJoinpointUsingReflection(AopUtils.java:360) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.984648776Z [inf]  	at com.razorpay.ApiClient.throwException(ApiClient.java:228) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:47:06.984651846Z [inf]  	at com.razorpay.ApiClient.processResponse(ApiClient.java:180) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:47:06.984659396Z [inf]  	at com.razorpay.ApiClient.post(ApiClient.java:55) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:47:06.984662946Z [inf]  	at com.razorpay.SubscriptionClient.post(SubscriptionClient.java:7) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:47:06.984666476Z [inf]  	at com.razorpay.ApiClient.post(ApiClient.java:50) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:47:06.984669326Z [inf]  	at com.razorpay.SubscriptionClient.post(SubscriptionClient.java:7) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:47:06.984672966Z [inf]  	at com.razorpay.SubscriptionClient.create(SubscriptionClient.java:14) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:47:06.984675875Z [inf]  	at com.jeevan.smart_notes_api.service.RazorpayService.createSubscription(RazorpayService.java:75) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:47:06.985291327Z [inf]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.invokeJoinpoint(ReflectiveMethodInvocation.java:196) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.985296847Z [inf]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:163) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.985301007Z [inf]  	at org.springframework.transaction.interceptor.TransactionAspectSupport.invokeWithinTransaction(TransactionAspectSupport.java:380) ~[spring-tx-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.985305077Z [inf]  	at org.springframework.transaction.interceptor.TransactionInterceptor.invoke(TransactionInterceptor.java:119) ~[spring-tx-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.985308617Z [inf]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:184) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.985314767Z [inf]  	at org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:728) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.985318727Z [inf]  	at com.jeevan.smart_notes_api.service.SubscriptionService$$SpringCGLIB$$0.createCheckoutSession(<generated>) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:47:06.985324187Z [inf]  	at com.jeevan.smart_notes_api.controller.SubscriptionController.createCheckoutSession(SubscriptionController.java:50) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:47:06.985328837Z [inf]  	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(Unknown Source) ~[na:na]
2026-08-12T17:47:06.985332976Z [inf]  	at java.base/java.lang.reflect.Method.invoke(Unknown Source) ~[na:na]
2026-08-12T17:47:06.985336596Z [inf]  	at org.springframework.web.method.support.InvocableHandlerMethod.doInvoke(InvocableHandlerMethod.java:258) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.985340306Z [inf]  	at org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:191) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.985941559Z [inf]  	at org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:118) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.985953199Z [inf]  	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:991) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.985959959Z [inf]  	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:896) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.985965659Z [inf]  	at org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:87) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.985969769Z [inf]  	at org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:1089) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.985975299Z [inf]  	at org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:979) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.985979479Z [inf]  	at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:1014) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.985983719Z [inf]  	at org.springframework.web.servlet.FrameworkServlet.doPost(FrameworkServlet.java:914) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.985987709Z [inf]  	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:590) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:06.985991638Z [inf]  	at org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:885) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.985995318Z [inf]  	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:658) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:06.985998968Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:06.987135085Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:06.987140025Z [inf]  	at org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:51) ~[tomcat-embed-websocket-10.1.54.jar!/:na]
2026-08-12T17:47:06.987144344Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:06.987148264Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:06.987152124Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:110) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.987157034Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:06.987160454Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:06.987164164Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:108) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.987167714Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:108) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.987171524Z [inf]  	at org.springframework.security.web.FilterChainProxy.lambda$doFilterInternal$3(FilterChainProxy.java:231) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:06.987175044Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:370) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:06.987178674Z [inf]  	at org.springframework.security.web.access.intercept.AuthorizationFilter.doFilter(AuthorizationFilter.java:101) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:06.988072602Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:06.988076112Z [inf]  	at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:125) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:06.988079792Z [inf]  	at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:119) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:06.988083532Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:06.988087072Z [inf]  	at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:131) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:06.988090332Z [inf]  	at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:85) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:06.988094482Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:06.988098382Z [inf]  	at org.springframework.security.web.authentication.AnonymousAuthenticationFilter.doFilter(AnonymousAuthenticationFilter.java:100) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:06.988103142Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:06.988107892Z [inf]  	at org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter.doFilter(SecurityContextHolderAwareRequestFilter.java:179) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:06.988779224Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:06.988785064Z [inf]  	at org.springframework.security.web.savedrequest.RequestCacheAwareFilter.doFilter(RequestCacheAwareFilter.java:63) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:06.988788773Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:06.988792363Z [inf]  	at com.jeevan.smart_notes_api.security.jwt.JwtFilter.doFilterInternal(JwtFilter.java:74) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:47:06.988795933Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.988799753Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:06.988803713Z [inf]  	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:107) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:06.988807123Z [inf]  	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:93) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:06.988811303Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:06.988814803Z [inf]  	at org.springframework.web.filter.CorsFilter.doFilterInternal(CorsFilter.java:91) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.988818313Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.988821933Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:06.989323227Z [inf]  	at org.springframework.security.web.session.DisableEncodeUrlFilter.doFilterInternal(DisableEncodeUrlFilter.java:42) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:06.989323397Z [inf]  	at org.springframework.security.web.header.HeaderWriterFilter.doHeadersAfter(HeaderWriterFilter.java:90) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:06.989328957Z [inf]  	at org.springframework.security.web.header.HeaderWriterFilter.doFilterInternal(HeaderWriterFilter.java:75) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:06.989333287Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.989337007Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:06.989339877Z [inf]  	at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:82) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:06.989343627Z [inf]  	at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:69) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:06.989346997Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:06.989349737Z [inf]  	at org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter.doFilterInternal(WebAsyncManagerIntegrationFilter.java:62) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:06.989352357Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.989354947Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:06.989930030Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.989942759Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:06.989949359Z [inf]  	at org.springframework.security.web.FilterChainProxy.doFilterInternal(FilterChainProxy.java:233) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:06.989953869Z [inf]  	at org.springframework.security.web.FilterChainProxy.doFilter(FilterChainProxy.java:191) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:06.989959019Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.989963739Z [inf]  	at org.springframework.web.filter.ServletRequestPathFilter.doFilter(ServletRequestPathFilter.java:52) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.989968189Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.989986049Z [inf]  	at org.springframework.web.filter.CompositeFilter.doFilter(CompositeFilter.java:74) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.989991199Z [inf]  	at org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration$CompositeFilterChainProxy.doFilter(WebSecurityConfiguration.java:319) ~[spring-security-config-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:06.989995559Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.990000759Z [inf]  	at org.springframework.web.servlet.handler.HandlerMappingIntrospector.lambda$createCacheFilter$4(HandlerMappingIntrospector.java:267) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.990317944Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.990320694Z [inf]  	at org.springframework.web.filter.CompositeFilter.doFilter(CompositeFilter.java:74) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.990323994Z [inf]  	at org.springframework.security.config.annotation.web.configuration.WebMvcSecurityConfiguration$CompositeFilterChainProxy.doFilter(WebMvcSecurityConfiguration.java:240) ~[spring-security-config-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:06.990327384Z [inf]  	at org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:362) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.990330864Z [inf]  	at org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:278) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.990333754Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:06.990337904Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:06.990341184Z [inf]  	at org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:100) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.990344094Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.990346724Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:06.990349404Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:06.990351833Z [inf]  	at org.springframework.web.filter.FormContentFilter.doFilterInternal(FormContentFilter.java:93) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.991143654Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.991149504Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:06.991153874Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:06.991157414Z [inf]  	at org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:201) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.991161204Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.991166834Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:06.991170614Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:06.991174723Z [inf]  	at org.springframework.web.filter.ForwardedHeaderFilter.doFilterInternal(ForwardedHeaderFilter.java:173) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.991182923Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:06.991186773Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:06.991190283Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:06.991660198Z [inf]  	at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:165) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:06.991663518Z [inf]  	at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:88) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:06.991666297Z [inf]  	at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:492) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:06.991669067Z [inf]  	at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:113) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:06.991671927Z [inf]  	at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:83) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:06.991674637Z [inf]  	at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:72) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:06.991677477Z [inf]  	at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:342) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:06.991680417Z [inf]  	at org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:399) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:06.991684177Z [inf]  	at org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:63) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:06.991687827Z [inf]  	at org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:903) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:06.991690477Z [inf]  	at org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1797) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:06.991693317Z [inf]  	at org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:52) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:06.991695867Z [inf]  	at org.apache.tomcat.util.threads.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:973) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:06.992250770Z [inf]  	at org.apache.tomcat.util.threads.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:491) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:06.992253870Z [inf]  	at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:63) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:06.992256840Z [inf]  	at java.base/java.lang.Thread.run(Unknown Source) ~[na:na]
2026-08-12T17:47:06.992259610Z [inf]  
2026-08-12T17:47:07.131946630Z [err]  	at com.jeevan.smart_notes_api.service.SubscriptionService$$SpringCGLIB$$0.createCheckoutSession(<generated>)
2026-08-12T17:47:07.131953100Z [err]  	at com.jeevan.smart_notes_api.controller.SubscriptionController.createCheckoutSession(SubscriptionController.java:50)
2026-08-12T17:47:07.132008469Z [err]  java.lang.RuntimeException: Failed to create Razorpay subscription
2026-08-12T17:47:07.132012279Z [err]  	at com.jeevan.smart_notes_api.service.RazorpayService.createSubscription(RazorpayService.java:78)
2026-08-12T17:47:07.132015999Z [err]  	at com.jeevan.smart_notes_api.service.SubscriptionService.createCheckoutSession(SubscriptionService.java:178)
2026-08-12T17:47:07.132019779Z [err]  	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(Unknown Source)
2026-08-12T17:47:07.132023259Z [err]  	at java.base/java.lang.reflect.Method.invoke(Unknown Source)
2026-08-12T17:47:07.132027009Z [err]  	at org.springframework.aop.support.AopUtils.invokeJoinpointUsingReflection(AopUtils.java:360)
2026-08-12T17:47:07.132030409Z [err]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.invokeJoinpoint(ReflectiveMethodInvocation.java:196)
2026-08-12T17:47:07.132033979Z [err]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:163)
2026-08-12T17:47:07.132037509Z [err]  	at org.springframework.transaction.interceptor.TransactionAspectSupport.invokeWithinTransaction(TransactionAspectSupport.java:380)
2026-08-12T17:47:07.132042038Z [err]  	at org.springframework.transaction.interceptor.TransactionInterceptor.invoke(TransactionInterceptor.java:119)
2026-08-12T17:47:07.132045118Z [err]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:184)
2026-08-12T17:47:07.132048358Z [err]  	at org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:728)
2026-08-12T17:47:07.132258906Z [err]  	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(Unknown Source)
2026-08-12T17:47:07.132265666Z [err]  	at java.base/java.lang.reflect.Method.invoke(Unknown Source)
2026-08-12T17:47:07.132269956Z [err]  	at org.springframework.web.method.support.InvocableHandlerMethod.doInvoke(InvocableHandlerMethod.java:258)
2026-08-12T17:47:07.132273606Z [err]  	at org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:191)
2026-08-12T17:47:07.132277226Z [err]  	at org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:118)
2026-08-12T17:47:07.132281486Z [err]  	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:991)
2026-08-12T17:47:07.132285456Z [err]  	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:896)
2026-08-12T17:47:07.132289685Z [err]  	at org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:87)
2026-08-12T17:47:07.132293385Z [err]  	at org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:1089)
2026-08-12T17:47:07.132297125Z [err]  	at org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:979)
2026-08-12T17:47:07.132300345Z [err]  	at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:1014)
2026-08-12T17:47:07.132303815Z [err]  	at org.springframework.web.servlet.FrameworkServlet.doPost(FrameworkServlet.java:914)
2026-08-12T17:47:07.132307435Z [err]  	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:590)
2026-08-12T17:47:07.132311745Z [err]  	at org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:885)
2026-08-12T17:47:07.132878328Z [err]  	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:658)
2026-08-12T17:47:07.132882188Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)
2026-08-12T17:47:07.132884698Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:47:07.132887318Z [err]  	at org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:51)
2026-08-12T17:47:07.132890718Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:47:07.132893808Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:47:07.132896598Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:110)
2026-08-12T17:47:07.132899388Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:47:07.132901948Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:47:07.132904888Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:108)
2026-08-12T17:47:07.132907298Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:108)
2026-08-12T17:47:07.132910378Z [err]  	at org.springframework.security.web.FilterChainProxy.lambda$doFilterInternal$3(FilterChainProxy.java:231)
2026-08-12T17:47:07.132912918Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:370)
2026-08-12T17:47:07.132915718Z [err]  	at org.springframework.security.web.access.intercept.AuthorizationFilter.doFilter(AuthorizationFilter.java:101)
2026-08-12T17:47:07.132919728Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:47:07.133295112Z [err]  	at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:125)
2026-08-12T17:47:07.133305662Z [err]  	at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:119)
2026-08-12T17:47:07.133311202Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:47:07.133315712Z [err]  	at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:131)
2026-08-12T17:47:07.133320322Z [err]  	at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:85)
2026-08-12T17:47:07.133326652Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:47:07.133331052Z [err]  	at org.springframework.security.web.authentication.AnonymousAuthenticationFilter.doFilter(AnonymousAuthenticationFilter.java:100)
2026-08-12T17:47:07.133339652Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:47:07.133344022Z [err]  	at org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter.doFilter(SecurityContextHolderAwareRequestFilter.java:179)
2026-08-12T17:47:07.133349792Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:47:07.133354602Z [err]  	at org.springframework.security.web.savedrequest.RequestCacheAwareFilter.doFilter(RequestCacheAwareFilter.java:63)
2026-08-12T17:47:07.133359081Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:47:07.133363361Z [err]  	at com.jeevan.smart_notes_api.security.jwt.JwtFilter.doFilterInternal(JwtFilter.java:74)
2026-08-12T17:47:07.134075053Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:47:07.134083883Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:47:07.134089113Z [err]  	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:107)
2026-08-12T17:47:07.134094363Z [err]  	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:93)
2026-08-12T17:47:07.134099052Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:47:07.134103372Z [err]  	at org.springframework.web.filter.CorsFilter.doFilterInternal(CorsFilter.java:91)
2026-08-12T17:47:07.134107872Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:47:07.134113212Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:47:07.134117052Z [err]  	at org.springframework.security.web.header.HeaderWriterFilter.doHeadersAfter(HeaderWriterFilter.java:90)
2026-08-12T17:47:07.134121112Z [err]  	at org.springframework.security.web.header.HeaderWriterFilter.doFilterInternal(HeaderWriterFilter.java:75)
2026-08-12T17:47:07.134125962Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:47:07.134130242Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:47:07.134135392Z [err]  	at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:82)
2026-08-12T17:47:07.134139462Z [err]  	at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:69)
2026-08-12T17:47:07.134753755Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:47:07.134758944Z [err]  	at org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter.doFilterInternal(WebAsyncManagerIntegrationFilter.java:62)
2026-08-12T17:47:07.134774304Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:47:07.134778184Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:47:07.134782244Z [err]  	at org.springframework.security.web.session.DisableEncodeUrlFilter.doFilterInternal(DisableEncodeUrlFilter.java:42)
2026-08-12T17:47:07.134785664Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:47:07.134789084Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:47:07.134792484Z [err]  	at org.springframework.security.web.FilterChainProxy.doFilterInternal(FilterChainProxy.java:233)
2026-08-12T17:47:07.134796114Z [err]  	at org.springframework.security.web.FilterChainProxy.doFilter(FilterChainProxy.java:191)
2026-08-12T17:47:07.134799674Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113)
2026-08-12T17:47:07.134803594Z [err]  	at org.springframework.web.filter.ServletRequestPathFilter.doFilter(ServletRequestPathFilter.java:52)
2026-08-12T17:47:07.134807774Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113)
2026-08-12T17:47:07.134812704Z [err]  	at org.springframework.web.filter.CompositeFilter.doFilter(CompositeFilter.java:74)
2026-08-12T17:47:07.134816944Z [err]  	at org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration$CompositeFilterChainProxy.doFilter(WebSecurityConfiguration.java:319)
2026-08-12T17:47:07.135207829Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113)
2026-08-12T17:47:07.135213379Z [err]  	at org.springframework.web.servlet.handler.HandlerMappingIntrospector.lambda$createCacheFilter$4(HandlerMappingIntrospector.java:267)
2026-08-12T17:47:07.135218679Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113)
2026-08-12T17:47:07.135223719Z [err]  	at org.springframework.web.filter.CompositeFilter.doFilter(CompositeFilter.java:74)
2026-08-12T17:47:07.135228259Z [err]  	at org.springframework.security.config.annotation.web.configuration.WebMvcSecurityConfiguration$CompositeFilterChainProxy.doFilter(WebMvcSecurityConfiguration.java:240)
2026-08-12T17:47:07.135232639Z [err]  	at org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:362)
2026-08-12T17:47:07.135237049Z [err]  	at org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:278)
2026-08-12T17:47:07.135241249Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:47:07.135245729Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:47:07.135250349Z [err]  	at org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:100)
2026-08-12T17:47:07.135254608Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:47:07.135258678Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:47:07.135269638Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:47:07.135273938Z [err]  	at org.springframework.web.filter.FormContentFilter.doFilterInternal(FormContentFilter.java:93)
2026-08-12T17:47:07.136175766Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:47:07.136177696Z [err]  	at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:492)
2026-08-12T17:47:07.136181606Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:47:07.136183716Z [err]  	at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:113)
2026-08-12T17:47:07.136185456Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:47:07.136189386Z [err]  	at org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:201)
2026-08-12T17:47:07.136192846Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:47:07.136196626Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:47:07.136200186Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:47:07.136204386Z [err]  	at org.springframework.web.filter.ForwardedHeaderFilter.doFilterInternal(ForwardedHeaderFilter.java:173)
2026-08-12T17:47:07.136208096Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:47:07.136211856Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:47:07.136217256Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:47:07.136221156Z [err]  	at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:165)
2026-08-12T17:47:07.136224936Z [err]  	at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:88)
2026-08-12T17:47:07.136625361Z [err]  	at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:83)
2026-08-12T17:47:07.136630641Z [err]  	at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:72)
2026-08-12T17:47:07.136634821Z [err]  	at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:342)
2026-08-12T17:47:07.136638521Z [err]  	at org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:399)
2026-08-12T17:47:07.136642511Z [err]  	at org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:63)
2026-08-12T17:47:07.136647211Z [err]  	at org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:903)
2026-08-12T17:47:07.136652351Z [err]  	at org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1797)
2026-08-12T17:47:07.136658231Z [err]  	at com.razorpay.ApiClient.processResponse(ApiClient.java:180)
2026-08-12T17:47:07.136658691Z [err]  	at org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:52)
2026-08-12T17:47:07.136664071Z [err]  	at org.apache.tomcat.util.threads.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:973)
2026-08-12T17:47:07.136672950Z [err]  	at com.razorpay.ApiClient.post(ApiClient.java:55)
2026-08-12T17:47:07.136678630Z [err]  	at org.apache.tomcat.util.threads.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:491)
2026-08-12T17:47:07.136680300Z [err]  	at com.razorpay.SubscriptionClient.post(SubscriptionClient.java:7)
2026-08-12T17:47:07.136685510Z [err]  	at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:63)
2026-08-12T17:47:07.136690470Z [err]  	at java.base/java.lang.Thread.run(Unknown Source)
2026-08-12T17:47:07.136694420Z [err]  Caused by: com.razorpay.RazorpayException: BAD_REQUEST_ERROR:The ID provided is invalid or could not be found.
2026-08-12T17:47:07.136698650Z [err]  	at com.razorpay.ApiClient.throwException(ApiClient.java:228)
2026-08-12T17:47:07.136954357Z [err]  	at com.razorpay.ApiClient.post(ApiClient.java:50)
2026-08-12T17:47:07.136957457Z [err]  	at com.razorpay.SubscriptionClient.post(SubscriptionClient.java:7)
2026-08-12T17:47:07.136959787Z [err]  	at com.razorpay.SubscriptionClient.create(SubscriptionClient.java:14)
2026-08-12T17:47:07.136962747Z [err]  	at com.jeevan.smart_notes_api.service.RazorpayService.createSubscription(RazorpayService.java:75)
2026-08-12T17:47:07.136965287Z [err]  	... 123 more
2026-08-12T17:47:08.808545382Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:47:09.285014012Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:47:09.549117063Z [inf]  Hibernate: update users set auth_provider=?,email=?,email_verified=?,password=?,profile_image_url=?,razorpay_customer_id=?,role=?,subscription_plan=?,updated_at=?,username=? where id=?
2026-08-12T17:47:09.710154755Z [inf]  Hibernate: select s1_0.id,s1_0.active,s1_0.billing_cycle,s1_0.cancel_at_cycle_end,s1_0.created_at,s1_0.current_period_end,s1_0.current_period_start,s1_0.end_date,s1_0.plan,s1_0.razorpay_plan_id,s1_0.razorpay_subscription_id,s1_0.start_date,s1_0.status,s1_0.updated_at,s1_0.user_id from subscriptions s1_0 left join users u1_0 on u1_0.id=s1_0.user_id where u1_0.email=?
2026-08-12T17:47:09.891969167Z [inf]  2026-08-12T17:47:09.889Z  INFO 1 --- [smart-notes-api] [nio-8080-exec-8] c.j.s.service.RazorpayService            : Creating Razorpay Subscription. CustomerID: 'cust_TOwi4Zw37Qv8gJ', PlanID: 'plan_TOuvcE0VB6FIrq'
2026-08-12T17:47:10.218151290Z [inf]  2026-08-12T17:47:10.054Z ERROR 1 --- [smart-notes-api] [nio-8080-exec-8] c.j.s.service.RazorpayService            : Failed to create Razorpay subscription for customer cust_TOwi4Zw37Qv8gJ and plan plan_TOuvcE0VB6FIrq
2026-08-12T17:47:10.218155210Z [inf]  
2026-08-12T17:47:10.218159410Z [inf]  com.razorpay.RazorpayException: BAD_REQUEST_ERROR:The ID provided is invalid or could not be found.
2026-08-12T17:47:10.218163020Z [inf]  	at com.razorpay.ApiClient.throwException(ApiClient.java:228) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:47:10.218166500Z [inf]  	at com.razorpay.ApiClient.processResponse(ApiClient.java:180) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:47:10.218170110Z [inf]  	at com.razorpay.ApiClient.post(ApiClient.java:55) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:47:10.218173910Z [inf]  	at com.razorpay.SubscriptionClient.post(SubscriptionClient.java:7) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:47:10.218177650Z [inf]  	at com.razorpay.ApiClient.post(ApiClient.java:50) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:47:10.218181400Z [inf]  	at com.razorpay.SubscriptionClient.post(SubscriptionClient.java:7) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:47:10.218184290Z [inf]  	at com.razorpay.SubscriptionClient.create(SubscriptionClient.java:14) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:47:10.218188010Z [inf]  	at com.jeevan.smart_notes_api.service.RazorpayService.createSubscription(RazorpayService.java:75) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:47:10.218192460Z [inf]  	at com.jeevan.smart_notes_api.service.SubscriptionService.createCheckoutSession(SubscriptionService.java:178) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:47:10.218196500Z [inf]  	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(Unknown Source) ~[na:na]
2026-08-12T17:47:10.218200490Z [inf]  	at java.base/java.lang.reflect.Method.invoke(Unknown Source) ~[na:na]
2026-08-12T17:47:10.218204150Z [inf]  	at org.springframework.aop.support.AopUtils.invokeJoinpointUsingReflection(AopUtils.java:360) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.218558345Z [inf]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.invokeJoinpoint(ReflectiveMethodInvocation.java:196) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.218562575Z [inf]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:163) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.218566235Z [inf]  	at org.springframework.transaction.interceptor.TransactionAspectSupport.invokeWithinTransaction(TransactionAspectSupport.java:380) ~[spring-tx-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.218570045Z [inf]  	at org.springframework.transaction.interceptor.TransactionInterceptor.invoke(TransactionInterceptor.java:119) ~[spring-tx-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.218573535Z [inf]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:184) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.218577315Z [inf]  	at org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:728) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.218580575Z [inf]  	at com.jeevan.smart_notes_api.service.SubscriptionService$$SpringCGLIB$$0.createCheckoutSession(<generated>) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:47:10.218583955Z [inf]  	at com.jeevan.smart_notes_api.controller.SubscriptionController.createCheckoutSession(SubscriptionController.java:50) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:47:10.218587185Z [inf]  	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(Unknown Source) ~[na:na]
2026-08-12T17:47:10.218590765Z [inf]  	at java.base/java.lang.reflect.Method.invoke(Unknown Source) ~[na:na]
2026-08-12T17:47:10.218594855Z [inf]  	at org.springframework.web.method.support.InvocableHandlerMethod.doInvoke(InvocableHandlerMethod.java:258) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.218598285Z [inf]  	at org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:191) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.219349135Z [inf]  	at org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:118) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.219353085Z [inf]  	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:991) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.219356825Z [inf]  	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:896) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.219360185Z [inf]  	at org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:87) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.219363695Z [inf]  	at org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:1089) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.219367055Z [inf]  	at org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:979) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.219370524Z [inf]  	at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:1014) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.219374724Z [inf]  	at org.springframework.web.servlet.FrameworkServlet.doPost(FrameworkServlet.java:914) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.219377994Z [inf]  	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:590) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:10.219381364Z [inf]  	at org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:885) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.219384634Z [inf]  	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:658) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:10.219388374Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:10.220014147Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:10.220018077Z [inf]  	at org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:51) ~[tomcat-embed-websocket-10.1.54.jar!/:na]
2026-08-12T17:47:10.220021777Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:10.220023317Z [inf]  	at org.springframework.security.web.FilterChainProxy.lambda$doFilterInternal$3(FilterChainProxy.java:231) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:10.220026747Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:10.220028906Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:370) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:10.220030826Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:110) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.220033066Z [inf]  	at org.springframework.security.web.access.intercept.AuthorizationFilter.doFilter(AuthorizationFilter.java:101) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:10.220062726Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:10.220074616Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:10.220079966Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:108) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.220084436Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:108) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.220905906Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:10.220909926Z [inf]  	at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:125) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:10.220912786Z [inf]  	at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:119) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:10.220916146Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:10.220919486Z [inf]  	at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:131) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:10.220922646Z [inf]  	at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:85) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:10.220926366Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:10.220929126Z [inf]  	at org.springframework.security.web.authentication.AnonymousAuthenticationFilter.doFilter(AnonymousAuthenticationFilter.java:100) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:10.220932056Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:10.220934655Z [inf]  	at org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter.doFilter(SecurityContextHolderAwareRequestFilter.java:179) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:10.221696525Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:10.221700005Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.221702355Z [inf]  	at org.springframework.security.web.savedrequest.RequestCacheAwareFilter.doFilter(RequestCacheAwareFilter.java:63) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:10.221706735Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:10.221709715Z [inf]  	at com.jeevan.smart_notes_api.security.jwt.JwtFilter.doFilterInternal(JwtFilter.java:74) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:47:10.221712615Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:10.221718275Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.221721485Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:10.221724555Z [inf]  	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:107) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:10.221727115Z [inf]  	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:93) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:10.221729605Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:10.221732245Z [inf]  	at org.springframework.web.filter.CorsFilter.doFilterInternal(CorsFilter.java:91) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.222232479Z [inf]  	at org.springframework.security.web.header.HeaderWriterFilter.doHeadersAfter(HeaderWriterFilter.java:90) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:10.222237709Z [inf]  	at org.springframework.security.web.header.HeaderWriterFilter.doFilterInternal(HeaderWriterFilter.java:75) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:10.222241539Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.222244799Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:10.222248458Z [inf]  	at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:82) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:10.222252488Z [inf]  	at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:69) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:10.222256138Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:10.222259818Z [inf]  	at org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter.doFilterInternal(WebAsyncManagerIntegrationFilter.java:62) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:10.222263368Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.222266738Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:10.222270118Z [inf]  	at org.springframework.security.web.session.DisableEncodeUrlFilter.doFilterInternal(DisableEncodeUrlFilter.java:42) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:10.223230337Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.223238946Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:10.223245016Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.223246446Z [inf]  	at org.springframework.security.web.FilterChainProxy.doFilterInternal(FilterChainProxy.java:233) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:10.223257086Z [inf]  	at org.springframework.security.web.FilterChainProxy.doFilter(FilterChainProxy.java:191) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:10.223259286Z [inf]  	at org.springframework.web.servlet.handler.HandlerMappingIntrospector.lambda$createCacheFilter$4(HandlerMappingIntrospector.java:267) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.223264616Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.223270696Z [inf]  	at org.springframework.web.filter.ServletRequestPathFilter.doFilter(ServletRequestPathFilter.java:52) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.223276716Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.223281546Z [inf]  	at org.springframework.web.filter.CompositeFilter.doFilter(CompositeFilter.java:74) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.223287246Z [inf]  	at org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration$CompositeFilterChainProxy.doFilter(WebSecurityConfiguration.java:319) ~[spring-security-config-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:10.223598492Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.223612512Z [inf]  	at org.springframework.web.filter.CompositeFilter.doFilter(CompositeFilter.java:74) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.223625372Z [inf]  	at org.springframework.security.config.annotation.web.configuration.WebMvcSecurityConfiguration$CompositeFilterChainProxy.doFilter(WebMvcSecurityConfiguration.java:240) ~[spring-security-config-6.5.10.jar!/:6.5.10]
2026-08-12T17:47:10.223630602Z [inf]  	at org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:362) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.223635402Z [inf]  	at org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:278) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.223640932Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:10.223645972Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:10.223654081Z [inf]  	at org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:100) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.223658991Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.223663951Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:10.223668171Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:10.223672721Z [inf]  	at org.springframework.web.filter.FormContentFilter.doFilterInternal(FormContentFilter.java:93) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.224245143Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.224250893Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:10.224253813Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:10.224257023Z [inf]  	at org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:201) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.224259913Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.224262703Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:10.224266243Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:10.224269353Z [inf]  	at org.springframework.web.filter.ForwardedHeaderFilter.doFilterInternal(ForwardedHeaderFilter.java:173) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.224271863Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:47:10.224274653Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:10.224277493Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:10.224857986Z [inf]  	at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:165) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:10.224863616Z [inf]  	at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:88) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:10.224868876Z [inf]  	at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:492) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:10.224873706Z [inf]  	at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:113) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:10.224878246Z [inf]  	at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:83) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:10.224882865Z [inf]  	at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:72) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:10.224894255Z [inf]  	at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:342) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:10.224897975Z [inf]  	at org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:399) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:10.224902105Z [inf]  	at org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:63) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:10.224905745Z [inf]  	at org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:903) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:10.224908985Z [inf]  	at org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1797) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:10.224913735Z [inf]  	at org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:52) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:10.224917465Z [inf]  	at org.apache.tomcat.util.threads.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:973) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:10.226089871Z [inf]  	at org.apache.tomcat.util.threads.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:491) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:10.226093671Z [inf]  	at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:63) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:47:10.226096191Z [inf]  	at java.base/java.lang.Thread.run(Unknown Source) ~[na:na]
2026-08-12T17:47:10.226099571Z [inf]  
2026-08-12T17:47:10.247050708Z [err]  java.lang.RuntimeException: Failed to create Razorpay subscription
2026-08-12T17:47:10.247057848Z [err]  	at com.jeevan.smart_notes_api.service.RazorpayService.createSubscription(RazorpayService.java:78)
2026-08-12T17:47:10.247064628Z [err]  	at com.jeevan.smart_notes_api.service.SubscriptionService.createCheckoutSession(SubscriptionService.java:178)
2026-08-12T17:47:10.247069058Z [err]  	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(Unknown Source)
2026-08-12T17:47:10.247073468Z [err]  	at java.base/java.lang.reflect.Method.invoke(Unknown Source)
2026-08-12T17:47:10.247077798Z [err]  	at org.springframework.aop.support.AopUtils.invokeJoinpointUsingReflection(AopUtils.java:360)
2026-08-12T17:47:10.247082348Z [err]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.invokeJoinpoint(ReflectiveMethodInvocation.java:196)
2026-08-12T17:47:10.247086938Z [err]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:163)
2026-08-12T17:47:10.247090648Z [err]  	at org.springframework.transaction.interceptor.TransactionAspectSupport.invokeWithinTransaction(TransactionAspectSupport.java:380)
2026-08-12T17:47:10.247095358Z [err]  	at org.springframework.transaction.interceptor.TransactionInterceptor.invoke(TransactionInterceptor.java:119)
2026-08-12T17:47:10.247099118Z [err]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:184)
2026-08-12T17:47:10.247102458Z [err]  	at org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:728)
2026-08-12T17:47:10.247105768Z [err]  	at com.jeevan.smart_notes_api.service.SubscriptionService$$SpringCGLIB$$0.createCheckoutSession(<generated>)
2026-08-12T17:47:10.247108838Z [err]  	at com.jeevan.smart_notes_api.controller.SubscriptionController.createCheckoutSession(SubscriptionController.java:50)
2026-08-12T17:47:10.247955306Z [err]  	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(Unknown Source)
2026-08-12T17:47:10.247960626Z [err]  	at java.base/java.lang.reflect.Method.invoke(Unknown Source)
2026-08-12T17:47:10.247965876Z [err]  	at org.springframework.web.method.support.InvocableHandlerMethod.doInvoke(InvocableHandlerMethod.java:258)
2026-08-12T17:47:10.247970046Z [err]  	at org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:191)
2026-08-12T17:47:10.247974336Z [err]  	at org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:118)
2026-08-12T17:47:10.247977826Z [err]  	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:991)
2026-08-12T17:47:10.247982326Z [err]  	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:896)
2026-08-12T17:47:10.247985786Z [err]  	at org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:87)
2026-08-12T17:47:10.247989266Z [err]  	at org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:1089)
2026-08-12T17:47:10.247992966Z [err]  	at org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:979)
2026-08-12T17:47:10.247996526Z [err]  	at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:1014)
2026-08-12T17:47:10.247999716Z [err]  	at org.springframework.web.servlet.FrameworkServlet.doPost(FrameworkServlet.java:914)
2026-08-12T17:47:10.248003316Z [err]  	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:590)
2026-08-12T17:47:10.248006976Z [err]  	at org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:885)
2026-08-12T17:47:10.248842236Z [err]  	at org.springframework.security.web.access.intercept.AuthorizationFilter.doFilter(AuthorizationFilter.java:101)
2026-08-12T17:47:10.248846416Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:47:10.248848906Z [err]  	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:658)
2026-08-12T17:47:10.248854575Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)
2026-08-12T17:47:10.248858465Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:47:10.248862485Z [err]  	at org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:51)
2026-08-12T17:47:10.248866515Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:47:10.248870455Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:47:10.248874325Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:110)
2026-08-12T17:47:10.248878225Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:47:10.248881495Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:47:10.248884905Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:108)
2026-08-12T17:47:10.248888375Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:108)
2026-08-12T17:47:10.248891785Z [err]  	at org.springframework.security.web.FilterChainProxy.lambda$doFilterInternal$3(FilterChainProxy.java:231)
2026-08-12T17:47:10.248895295Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:370)
2026-08-12T17:47:10.249484468Z [err]  	at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:125)
2026-08-12T17:47:10.249490968Z [err]  	at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:119)
2026-08-12T17:47:10.249505128Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:47:10.249513107Z [err]  	at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:131)
2026-08-12T17:47:10.249517237Z [err]  	at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:85)
2026-08-12T17:47:10.249521717Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:47:10.249525737Z [err]  	at org.springframework.security.web.authentication.AnonymousAuthenticationFilter.doFilter(AnonymousAuthenticationFilter.java:100)
2026-08-12T17:47:10.249529847Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:47:10.249534367Z [err]  	at org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter.doFilter(SecurityContextHolderAwareRequestFilter.java:179)
2026-08-12T17:47:10.249538617Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:47:10.249542907Z [err]  	at org.springframework.security.web.savedrequest.RequestCacheAwareFilter.doFilter(RequestCacheAwareFilter.java:63)
2026-08-12T17:47:10.249546977Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:47:10.249550597Z [err]  	at com.jeevan.smart_notes_api.security.jwt.JwtFilter.doFilterInternal(JwtFilter.java:74)
2026-08-12T17:47:10.250317647Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:47:10.250323277Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:47:10.250328207Z [err]  	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:107)
2026-08-12T17:47:10.250333556Z [err]  	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:93)
2026-08-12T17:47:10.250337956Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:47:10.250343326Z [err]  	at org.springframework.web.filter.CorsFilter.doFilterInternal(CorsFilter.java:91)
2026-08-12T17:47:10.250348886Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:47:10.250353986Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:47:10.250358586Z [err]  	at org.springframework.security.web.header.HeaderWriterFilter.doHeadersAfter(HeaderWriterFilter.java:90)
2026-08-12T17:47:10.250363396Z [err]  	at org.springframework.security.web.header.HeaderWriterFilter.doFilterInternal(HeaderWriterFilter.java:75)
2026-08-12T17:47:10.250370086Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:47:10.250375146Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:47:10.250378966Z [err]  	at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:82)
2026-08-12T17:47:10.250383556Z [err]  	at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:69)
2026-08-12T17:47:10.250944689Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:47:10.250953739Z [err]  	at org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter.doFilterInternal(WebAsyncManagerIntegrationFilter.java:62)
2026-08-12T17:47:10.250960859Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:47:10.250966339Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:47:10.250971829Z [err]  	at org.springframework.security.web.session.DisableEncodeUrlFilter.doFilterInternal(DisableEncodeUrlFilter.java:42)
2026-08-12T17:47:10.250976749Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:47:10.250982339Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:47:10.250987459Z [err]  	at org.springframework.security.web.FilterChainProxy.doFilterInternal(FilterChainProxy.java:233)
2026-08-12T17:47:10.250992238Z [err]  	at org.springframework.security.web.FilterChainProxy.doFilter(FilterChainProxy.java:191)
2026-08-12T17:47:10.250998188Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113)
2026-08-12T17:47:10.251002818Z [err]  	at org.springframework.web.filter.ServletRequestPathFilter.doFilter(ServletRequestPathFilter.java:52)
2026-08-12T17:47:10.251007218Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113)
2026-08-12T17:47:10.251011908Z [err]  	at org.springframework.web.filter.CompositeFilter.doFilter(CompositeFilter.java:74)
2026-08-12T17:47:10.251016348Z [err]  	at org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration$CompositeFilterChainProxy.doFilter(WebSecurityConfiguration.java:319)
2026-08-12T17:47:10.251836678Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113)
2026-08-12T17:47:10.251843088Z [err]  	at org.springframework.web.servlet.handler.HandlerMappingIntrospector.lambda$createCacheFilter$4(HandlerMappingIntrospector.java:267)
2026-08-12T17:47:10.251847788Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113)
2026-08-12T17:47:10.251852248Z [err]  	at org.springframework.web.filter.CompositeFilter.doFilter(CompositeFilter.java:74)
2026-08-12T17:47:10.251856988Z [err]  	at org.springframework.security.config.annotation.web.configuration.WebMvcSecurityConfiguration$CompositeFilterChainProxy.doFilter(WebMvcSecurityConfiguration.java:240)
2026-08-12T17:47:10.251861688Z [err]  	at org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:362)
2026-08-12T17:47:10.251866068Z [err]  	at org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:278)
2026-08-12T17:47:10.251870808Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:47:10.251875658Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:47:10.251879928Z [err]  	at org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:100)
2026-08-12T17:47:10.251884258Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:47:10.251888468Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:47:10.251893198Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:47:10.251898077Z [err]  	at org.springframework.web.filter.FormContentFilter.doFilterInternal(FormContentFilter.java:93)
2026-08-12T17:47:10.252360532Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:47:10.252368272Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:47:10.252373602Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:47:10.252379512Z [err]  	at org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:201)
2026-08-12T17:47:10.252385342Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:47:10.252390221Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:47:10.252395761Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:47:10.252401561Z [err]  	at org.springframework.web.filter.ForwardedHeaderFilter.doFilterInternal(ForwardedHeaderFilter.java:173)
2026-08-12T17:47:10.252406641Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:47:10.252411471Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:47:10.252417231Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:47:10.252422421Z [err]  	at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:165)
2026-08-12T17:47:10.252427441Z [err]  	at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:88)
2026-08-12T17:47:10.252432171Z [err]  	at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:492)
2026-08-12T17:47:10.252436461Z [err]  	at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:113)
2026-08-12T17:47:10.253178231Z [err]  	at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:83)
2026-08-12T17:47:10.253184121Z [err]  	at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:72)
2026-08-12T17:47:10.253187851Z [err]  	at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:342)
2026-08-12T17:47:10.253191041Z [err]  	at org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:399)
2026-08-12T17:47:10.253207521Z [err]  	at org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:63)
2026-08-12T17:47:10.253210820Z [err]  	at org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:903)
2026-08-12T17:47:10.253214210Z [err]  	at org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1797)
2026-08-12T17:47:10.253217500Z [err]  	at org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:52)
2026-08-12T17:47:10.253221550Z [err]  	at org.apache.tomcat.util.threads.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:973)
2026-08-12T17:47:10.253225980Z [err]  	at org.apache.tomcat.util.threads.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:491)
2026-08-12T17:47:10.253228990Z [err]  	at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:63)
2026-08-12T17:47:10.253232100Z [err]  	at java.base/java.lang.Thread.run(Unknown Source)
2026-08-12T17:47:10.253245420Z [err]  Caused by: com.razorpay.RazorpayException: BAD_REQUEST_ERROR:The ID provided is invalid or could not be found.
2026-08-12T17:47:10.253248450Z [err]  	at com.razorpay.ApiClient.throwException(ApiClient.java:228)
2026-08-12T17:47:10.253260770Z [err]  	at com.razorpay.ApiClient.processResponse(ApiClient.java:180)
2026-08-12T17:47:10.253263950Z [err]  	at com.razorpay.ApiClient.post(ApiClient.java:55)
2026-08-12T17:47:10.253268260Z [err]  	at com.razorpay.SubscriptionClient.post(SubscriptionClient.java:7)
2026-08-12T17:47:10.253667985Z [err]  	at com.razorpay.ApiClient.post(ApiClient.java:50)
2026-08-12T17:47:10.253674345Z [err]  	at com.razorpay.SubscriptionClient.post(SubscriptionClient.java:7)
2026-08-12T17:47:10.253679545Z [err]  	at com.razorpay.SubscriptionClient.create(SubscriptionClient.java:14)
2026-08-12T17:47:10.253687305Z [err]  	at com.jeevan.smart_notes_api.service.RazorpayService.createSubscription(RazorpayService.java:75)
2026-08-12T17:47:10.253692515Z [err]  	... 123 more
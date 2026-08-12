2026-08-12T17:37:51.919108101Z [inf]  2026-08-12T17:37:51.896Z  INFO 1 --- [smart-notes-api] [           main] o.h.e.t.j.p.i.JtaPlatformInitiator       : HHH000489: No JTA platform available (set 'hibernate.transaction.jta.platform' to enable JTA platform integration)
2026-08-12T17:38:11.335803981Z [inf]  2026-08-12T17:38:02.490Z  INFO 1 --- [smart-notes-api] [           main] j.LocalContainerEntityManagerFactoryBean : Initialized JPA EntityManagerFactory for persistence unit 'default'
2026-08-12T17:38:11.335814940Z [inf]  2026-08-12T17:38:03.436Z  INFO 1 --- [smart-notes-api] [           main] c.j.smart_notes_api.config.AiConfig      : ✅ Added Gemini slot [AQ.A...AuFw]
2026-08-12T17:38:11.335821592Z [inf]  2026-08-12T17:38:03.449Z  INFO 1 --- [smart-notes-api] [           main] c.j.smart_notes_api.config.AiConfig      : ✅ Added Gemini slot [AQ.A...0wGg]
2026-08-12T17:38:11.335827550Z [inf]  2026-08-12T17:38:03.451Z  INFO 1 --- [smart-notes-api] [           main] c.j.smart_notes_api.config.AiConfig      : ✅ Added Groq slot [gsk_...yhvA]
2026-08-12T17:38:11.335840031Z [inf]  2026-08-12T17:38:03.453Z  INFO 1 --- [smart-notes-api] [           main] c.j.s.config.AiProviderPool              : ═══════════════════════════════════════════════════════════════
2026-08-12T17:38:11.335847071Z [inf]  2026-08-12T17:38:03.453Z  INFO 1 --- [smart-notes-api] [           main] c.j.s.config.AiProviderPool              : 🚀 AI Provider Pool initialized with 3 total slots:
2026-08-12T17:38:11.335860642Z [inf]  2026-08-12T17:38:03.453Z  INFO 1 --- [smart-notes-api] [           main] c.j.s.config.AiProviderPool              :    ├─ GEMINI [AQ.A****AuFw]
2026-08-12T17:38:11.335868748Z [inf]  2026-08-12T17:38:03.453Z  INFO 1 --- [smart-notes-api] [           main] c.j.s.config.AiProviderPool              :    ├─ GEMINI [AQ.A****0wGg]
2026-08-12T17:38:11.335875586Z [inf]  2026-08-12T17:38:03.453Z  INFO 1 --- [smart-notes-api] [           main] c.j.s.config.AiProviderPool              :    ├─ GROQ [gsk_****yhvA]
2026-08-12T17:38:11.335884082Z [inf]  2026-08-12T17:38:03.453Z  INFO 1 --- [smart-notes-api] [           main] c.j.s.config.AiProviderPool              : ═══════════════════════════════════════════════════════════════
2026-08-12T17:38:11.337885944Z [inf]  2026-08-12T17:38:03.520Z  INFO 1 --- [smart-notes-api] [           main] o.s.d.j.r.query.QueryEnhancerFactory     : Hibernate is in classpath; If applicable, HQL parser will be used.
2026-08-12T17:38:11.337893593Z [inf]  2026-08-12T17:38:04.459Z  INFO 1 --- [smart-notes-api] [           main] c.j.smart_notes_api.service.AiService    : 🤖 AiService initialized with AiProviderPool (failover enabled)
2026-08-12T17:38:11.337899952Z [inf]  2026-08-12T17:38:04.628Z  INFO 1 --- [smart-notes-api] [           main] eAuthenticationProviderManagerConfigurer : Global AuthenticationManager configured with AuthenticationProvider bean with name authenticationProvider
2026-08-12T17:38:11.337916309Z [inf]  2026-08-12T17:38:04.629Z  WARN 1 --- [smart-notes-api] [           main] r$InitializeUserDetailsManagerConfigurer : Global AuthenticationManager configured with an AuthenticationProvider bean. UserDetailsService beans will not be used by Spring Security for automatically configuring username/password login. Consider removing the AuthenticationProvider bean. Alternatively, consider using the UserDetailsService in a manually instantiated DaoAuthenticationProvider. If the current configuration is intentional, to turn off this warning, increase the logging level of 'org.springframework.security.config.annotation.authentication.configuration.InitializeUserDetailsBeanManagerConfigurer' to ERROR
2026-08-12T17:38:11.337923981Z [inf]  2026-08-12T17:38:05.592Z  WARN 1 --- [smart-notes-api] [           main] JpaBaseConfiguration$JpaWebConfiguration : spring.jpa.open-in-view is enabled by default. Therefore, database queries may be performed during view rendering. Explicitly configure spring.jpa.open-in-view to disable this warning
2026-08-12T17:38:11.337931459Z [inf]  2026-08-12T17:38:07.334Z  INFO 1 --- [smart-notes-api] [           main] o.s.m.s.b.SimpleBrokerMessageHandler     : Starting...
2026-08-12T17:38:11.337938987Z [inf]  2026-08-12T17:38:07.335Z  INFO 1 --- [smart-notes-api] [           main] o.s.m.s.b.SimpleBrokerMessageHandler     : BrokerAvailabilityEvent[available=true, SimpleBrokerMessageHandler [org.springframework.messaging.simp.broker.DefaultSubscriptionRegistry@648be86e]]
2026-08-12T17:38:11.341973965Z [inf]  2026-08-12T17:38:07.337Z  INFO 1 --- [smart-notes-api] [           main] o.s.m.s.b.SimpleBrokerMessageHandler     : Started.
2026-08-12T17:38:11.341982681Z [inf]  2026-08-12T17:38:07.353Z  INFO 1 --- [smart-notes-api] [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port 8080 (http) with context path '/'
2026-08-12T17:38:11.341990923Z [inf]  2026-08-12T17:38:07.369Z  INFO 1 --- [smart-notes-api] [           main] c.j.s.SmartNotesApiApplication           : Started SmartNotesApiApplication in 26.047 seconds (process running for 26.955)
2026-08-12T17:38:17.284597112Z [inf]  2026-08-12T17:38:17.129Z  INFO 1 --- [smart-notes-api] [nio-8080-exec-2] o.s.web.servlet.DispatcherServlet        : Initializing Servlet 'dispatcherServlet'
2026-08-12T17:38:17.284612076Z [inf]  2026-08-12T17:38:17.131Z  INFO 1 --- [smart-notes-api] [nio-8080-exec-2] o.s.web.servlet.DispatcherServlet        : Completed initialization in 2 ms
2026-08-12T17:38:17.284728228Z [inf]  2026-08-12T17:38:17.128Z  INFO 1 --- [smart-notes-api] [nio-8080-exec-2] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring DispatcherServlet 'dispatcherServlet'
2026-08-12T17:38:18.630662105Z [inf]  2026-08-12T17:38:17.621Z  INFO 1 --- [smart-notes-api] [nio-8080-exec-2] c.j.s.service.GoogleTokenVerifier        : [GoogleTokenVerifier] Successfully verified Google user: Anshul Rathod (anshulrathod76@gmail.com)
2026-08-12T17:38:18.630669939Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:38:18.630677601Z [inf]  2026-08-12T17:38:18.171Z  INFO 1 --- [smart-notes-api] [nio-8080-exec-2] c.j.smart_notes_api.service.AuthService  : [AuthService] Google user logged in: anshulrathod76@gmail.com
2026-08-12T17:38:18.630685848Z [inf]  Hibernate: select rt1_0.id,rt1_0.email,rt1_0.expiry_date,rt1_0.token from refresh_tokens rt1_0 where rt1_0.email=?
2026-08-12T17:38:18.630693960Z [inf]  Hibernate: update refresh_tokens set email=?,expiry_date=?,token=? where id=?
2026-08-12T17:38:20.953500667Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:38:20.953506736Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:38:22.146586393Z [inf]  Hibernate: select cs1_0.id,cs1_0.created_at,cs1_0.pinned,cs1_0.title,cs1_0.updated_at,cs1_0.user_id from chat_sessions cs1_0 left join users u1_0 on u1_0.id=cs1_0.user_id where u1_0.email=? order by cs1_0.updated_at desc
2026-08-12T17:38:22.146602328Z [inf]  Hibernate: select n1_0.id,n1_0.content,n1_0.created_at,n1_0.title,n1_0.user_id from notes n1_0 left join users u1_0 on u1_0.id=n1_0.user_id where u1_0.email=?
2026-08-12T17:38:22.146614336Z [inf]  Hibernate: select s1_0.id,s1_0.active,s1_0.billing_cycle,s1_0.cancel_at_cycle_end,s1_0.created_at,s1_0.current_period_end,s1_0.current_period_start,s1_0.end_date,s1_0.plan,s1_0.razorpay_plan_id,s1_0.razorpay_subscription_id,s1_0.start_date,s1_0.status,s1_0.updated_at,s1_0.user_id from subscriptions s1_0 left join users u1_0 on u1_0.id=s1_0.user_id where u1_0.email=?
2026-08-12T17:38:22.146638043Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:38:22.146652743Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:38:22.146661256Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:38:22.146670603Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:38:22.146679281Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:38:23.369754705Z [inf]  Hibernate: select ut1_0.id,ut1_0.ai_requests,ut1_0.images_attached,ut1_0.images_generated,ut1_0.pdfs_attached,ut1_0.pdfs_generated,ut1_0.usage_date,ut1_0.user_id from usage_tracker ut1_0 left join users u1_0 on u1_0.id=ut1_0.user_id where u1_0.email=? and ut1_0.usage_date=?
2026-08-12T17:38:23.369898116Z [inf]  Hibernate: select s1_0.id,s1_0.active,s1_0.billing_cycle,s1_0.cancel_at_cycle_end,s1_0.created_at,s1_0.current_period_end,s1_0.current_period_start,s1_0.end_date,s1_0.plan,s1_0.razorpay_plan_id,s1_0.razorpay_subscription_id,s1_0.start_date,s1_0.status,s1_0.updated_at,s1_0.user_id from subscriptions s1_0 left join users u1_0 on u1_0.id=s1_0.user_id where u1_0.email=?
2026-08-12T17:38:23.369907845Z [inf]  Hibernate: select n1_0.id,n1_0.created_at,n1_0.description,n1_0.is_read,n1_0.title,n1_0.type,n1_0.user_id from notifications n1_0 where n1_0.user_id=? order by n1_0.created_at desc
2026-08-12T17:38:23.369915704Z [inf]  Hibernate: select ut1_0.id,ut1_0.ai_requests,ut1_0.images_attached,ut1_0.images_generated,ut1_0.pdfs_attached,ut1_0.pdfs_generated,ut1_0.usage_date,ut1_0.user_id from usage_tracker ut1_0 left join users u1_0 on u1_0.id=ut1_0.user_id where u1_0.email=? and ut1_0.usage_date=?
2026-08-12T17:38:23.369923182Z [inf]  Hibernate: select s1_0.id,s1_0.active,s1_0.billing_cycle,s1_0.cancel_at_cycle_end,s1_0.created_at,s1_0.current_period_end,s1_0.current_period_start,s1_0.end_date,s1_0.plan,s1_0.razorpay_plan_id,s1_0.razorpay_subscription_id,s1_0.start_date,s1_0.status,s1_0.updated_at,s1_0.user_id from subscriptions s1_0 left join users u1_0 on u1_0.id=s1_0.user_id where u1_0.email=?
2026-08-12T17:38:24.321990663Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:38:24.322000058Z [inf]  Hibernate: select s1_0.id,s1_0.active,s1_0.billing_cycle,s1_0.cancel_at_cycle_end,s1_0.created_at,s1_0.current_period_end,s1_0.current_period_start,s1_0.end_date,s1_0.plan,s1_0.razorpay_plan_id,s1_0.razorpay_subscription_id,s1_0.start_date,s1_0.status,s1_0.updated_at,s1_0.user_id from subscriptions s1_0 left join users u1_0 on u1_0.id=s1_0.user_id where u1_0.email=?
2026-08-12T17:38:24.322008564Z [inf]  Hibernate: select s1_0.id,s1_0.active,s1_0.billing_cycle,s1_0.cancel_at_cycle_end,s1_0.created_at,s1_0.current_period_end,s1_0.current_period_start,s1_0.end_date,s1_0.plan,s1_0.razorpay_plan_id,s1_0.razorpay_subscription_id,s1_0.start_date,s1_0.status,s1_0.updated_at,s1_0.user_id from subscriptions s1_0 left join users u1_0 on u1_0.id=s1_0.user_id where u1_0.email=?
2026-08-12T17:38:24.322017503Z [inf]  Hibernate: select ut1_0.id,ut1_0.ai_requests,ut1_0.images_attached,ut1_0.images_generated,ut1_0.pdfs_attached,ut1_0.pdfs_generated,ut1_0.usage_date,ut1_0.user_id from usage_tracker ut1_0 left join users u1_0 on u1_0.id=ut1_0.user_id where u1_0.email=? and ut1_0.usage_date=?
2026-08-12T17:38:26.428739002Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:38:26.461734431Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:38:27.419304153Z [inf]  2026-08-12T17:38:27.353Z ERROR 1 --- [smart-notes-api] [nio-8080-exec-6] c.j.s.service.RazorpayService            : Failed to create Razorpay customer for user 1
2026-08-12T17:38:27.419317929Z [inf]  
2026-08-12T17:38:27.419329216Z [inf]  com.razorpay.RazorpayException: BAD_REQUEST_ERROR:Customer already exists for the merchant
2026-08-12T17:38:27.419337877Z [inf]  	at com.razorpay.ApiClient.throwException(ApiClient.java:228) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:38:27.419345630Z [inf]  	at com.razorpay.ApiClient.processResponse(ApiClient.java:180) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:38:27.419347670Z [inf]  	at com.razorpay.ApiClient.post(ApiClient.java:55) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:38:27.419361411Z [inf]  	at com.razorpay.CustomerClient.post(CustomerClient.java:7) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:38:27.419374023Z [inf]  	at com.razorpay.ApiClient.post(ApiClient.java:50) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:38:27.419381485Z [inf]  	at com.razorpay.CustomerClient.post(CustomerClient.java:7) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:38:27.419389123Z [inf]  	at com.razorpay.CustomerClient.create(CustomerClient.java:14) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:38:27.419398278Z [inf]  	at com.jeevan.smart_notes_api.service.RazorpayService.getOrCreateCustomer(RazorpayService.java:51) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:38:27.419404475Z [inf]  	at com.jeevan.smart_notes_api.service.SubscriptionService.createCheckoutSession(SubscriptionService.java:163) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:38:27.419409771Z [inf]  	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(Unknown Source) ~[na:na]
2026-08-12T17:38:27.419416484Z [inf]  	at java.base/java.lang.reflect.Method.invoke(Unknown Source) ~[na:na]
2026-08-12T17:38:27.419424494Z [inf]  	at org.springframework.aop.support.AopUtils.invokeJoinpointUsingReflection(AopUtils.java:360) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.421763549Z [inf]  	at java.base/java.lang.reflect.Method.invoke(Unknown Source) ~[na:na]
2026-08-12T17:38:27.421773593Z [inf]  	at org.springframework.web.method.support.InvocableHandlerMethod.doInvoke(InvocableHandlerMethod.java:258) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.421779495Z [inf]  	at org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:191) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.421823884Z [inf]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.invokeJoinpoint(ReflectiveMethodInvocation.java:196) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.421829394Z [inf]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:163) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.421834434Z [inf]  	at org.springframework.transaction.interceptor.TransactionAspectSupport.invokeWithinTransaction(TransactionAspectSupport.java:380) ~[spring-tx-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.421846174Z [inf]  	at org.springframework.transaction.interceptor.TransactionInterceptor.invoke(TransactionInterceptor.java:119) ~[spring-tx-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.421851040Z [inf]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:184) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.421855651Z [inf]  	at org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:728) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.421862253Z [inf]  	at com.jeevan.smart_notes_api.service.SubscriptionService$$SpringCGLIB$$0.createCheckoutSession(<generated>) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:38:27.421867618Z [inf]  	at com.jeevan.smart_notes_api.controller.SubscriptionController.createCheckoutSession(SubscriptionController.java:50) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:38:27.421874088Z [inf]  	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(Unknown Source) ~[na:na]
2026-08-12T17:38:27.423599922Z [inf]  	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:658) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:27.423633571Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:27.423672723Z [inf]  	at org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:118) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.423679626Z [inf]  	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:991) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.423684739Z [inf]  	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:896) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.423692663Z [inf]  	at org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:87) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.423699807Z [inf]  	at org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:1089) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.423707849Z [inf]  	at org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:979) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.423712483Z [inf]  	at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:1014) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.423751919Z [inf]  	at org.springframework.web.servlet.FrameworkServlet.doPost(FrameworkServlet.java:914) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.423760163Z [inf]  	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:590) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:27.423765462Z [inf]  	at org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:885) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.431291536Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:27.431306766Z [inf]  	at org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:51) ~[tomcat-embed-websocket-10.1.54.jar!/:na]
2026-08-12T17:38:27.431316783Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:27.431324707Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:27.431339234Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:110) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.431351379Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:27.431358046Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:27.431365329Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:108) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.431454611Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:108) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.431459236Z [inf]  	at org.springframework.security.web.FilterChainProxy.lambda$doFilterInternal$3(FilterChainProxy.java:231) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:27.431463810Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:370) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:27.431468246Z [inf]  	at org.springframework.security.web.access.intercept.AuthorizationFilter.doFilter(AuthorizationFilter.java:101) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:27.434616125Z [inf]  	at org.springframework.security.web.authentication.AnonymousAuthenticationFilter.doFilter(AnonymousAuthenticationFilter.java:100) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:27.434629555Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:27.434638046Z [inf]  	at org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter.doFilter(SecurityContextHolderAwareRequestFilter.java:179) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:27.434640841Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:27.434646853Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:27.434653262Z [inf]  	at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:125) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:27.434660732Z [inf]  	at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:119) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:27.434666793Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:27.434674419Z [inf]  	at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:131) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:27.434686422Z [inf]  	at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:85) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:27.434701277Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:27.439562558Z [inf]  	at org.springframework.security.web.savedrequest.RequestCacheAwareFilter.doFilter(RequestCacheAwareFilter.java:63) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:27.439575169Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:27.439583961Z [inf]  	at com.jeevan.smart_notes_api.security.jwt.JwtFilter.doFilterInternal(JwtFilter.java:74) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:38:27.439591990Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.439599964Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:27.439606564Z [inf]  	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:107) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:27.439612678Z [inf]  	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:93) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:27.439618744Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:27.439626218Z [inf]  	at org.springframework.web.filter.CorsFilter.doFilterInternal(CorsFilter.java:91) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.439631784Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.439636564Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:27.441927140Z [inf]  	at org.springframework.security.web.header.HeaderWriterFilter.doHeadersAfter(HeaderWriterFilter.java:90) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:27.441945445Z [inf]  	at org.springframework.security.web.header.HeaderWriterFilter.doFilterInternal(HeaderWriterFilter.java:75) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:27.441954569Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.441962361Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:27.441969347Z [inf]  	at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:82) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:27.441976327Z [inf]  	at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:69) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:27.441982789Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:27.441989702Z [inf]  	at org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter.doFilterInternal(WebAsyncManagerIntegrationFilter.java:62) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:27.441997266Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.442006974Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:27.442018557Z [inf]  	at org.springframework.security.web.session.DisableEncodeUrlFilter.doFilterInternal(DisableEncodeUrlFilter.java:42) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:27.446109266Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.446125520Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:27.446147899Z [inf]  	at org.springframework.security.web.FilterChainProxy.doFilterInternal(FilterChainProxy.java:233) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:27.446156693Z [inf]  	at org.springframework.security.web.FilterChainProxy.doFilter(FilterChainProxy.java:191) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:27.446168593Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.446177160Z [inf]  	at org.springframework.web.filter.ServletRequestPathFilter.doFilter(ServletRequestPathFilter.java:52) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.446184156Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.446194652Z [inf]  	at org.springframework.web.filter.CompositeFilter.doFilter(CompositeFilter.java:74) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.446202654Z [inf]  	at org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration$CompositeFilterChainProxy.doFilter(WebSecurityConfiguration.java:319) ~[spring-security-config-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:27.446210631Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.446232028Z [inf]  	at org.springframework.web.servlet.handler.HandlerMappingIntrospector.lambda$createCacheFilter$4(HandlerMappingIntrospector.java:267) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.449476435Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.449491042Z [inf]  	at org.springframework.web.filter.CompositeFilter.doFilter(CompositeFilter.java:74) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.449502230Z [inf]  	at org.springframework.security.config.annotation.web.configuration.WebMvcSecurityConfiguration$CompositeFilterChainProxy.doFilter(WebMvcSecurityConfiguration.java:240) ~[spring-security-config-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:27.449510570Z [inf]  	at org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:362) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.449519966Z [inf]  	at org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:278) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.449529293Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:27.449535832Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:27.449545858Z [inf]  	at org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:100) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.449552315Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.449560741Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:27.449567969Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:27.449575079Z [inf]  	at org.springframework.web.filter.FormContentFilter.doFilterInternal(FormContentFilter.java:93) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.451306171Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.451316130Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:27.451322974Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:27.451333227Z [inf]  	at org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:201) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.451340052Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.451347468Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:27.451355130Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:27.451362824Z [inf]  	at org.springframework.web.filter.ForwardedHeaderFilter.doFilterInternal(ForwardedHeaderFilter.java:173) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.451369914Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:27.451379398Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:27.451385659Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:27.451393214Z [inf]  	at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:165) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:27.453986451Z [inf]  	at org.apache.tomcat.util.threads.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:973) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:27.454005422Z [inf]  	at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:88) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:27.454012903Z [inf]  	at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:492) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:27.454019098Z [inf]  	at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:113) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:27.454024718Z [inf]  	at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:83) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:27.454031052Z [inf]  	at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:72) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:27.454038453Z [inf]  	at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:342) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:27.454046565Z [inf]  	at org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:399) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:27.454056844Z [inf]  	at org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:63) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:27.454063694Z [inf]  	at org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:903) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:27.454072323Z [inf]  	at org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1797) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:27.454078521Z [inf]  	at org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:52) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:27.456286120Z [inf]  	at org.apache.tomcat.util.threads.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:491) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:27.456294335Z [inf]  	at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:63) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:27.456301633Z [inf]  	at java.base/java.lang.Thread.run(Unknown Source) ~[na:na]
2026-08-12T17:38:27.456307020Z [inf]  
2026-08-12T17:38:27.541868523Z [err]  java.lang.RuntimeException: Failed to create Razorpay customer
2026-08-12T17:38:27.541886307Z [err]  	at com.jeevan.smart_notes_api.service.RazorpayService.getOrCreateCustomer(RazorpayService.java:55)
2026-08-12T17:38:27.541896600Z [err]  	at com.jeevan.smart_notes_api.service.SubscriptionService.createCheckoutSession(SubscriptionService.java:163)
2026-08-12T17:38:27.541905373Z [err]  	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(Unknown Source)
2026-08-12T17:38:27.541913908Z [err]  	at java.base/java.lang.reflect.Method.invoke(Unknown Source)
2026-08-12T17:38:27.541928555Z [err]  	at org.springframework.aop.support.AopUtils.invokeJoinpointUsingReflection(AopUtils.java:360)
2026-08-12T17:38:27.541940149Z [err]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.invokeJoinpoint(ReflectiveMethodInvocation.java:196)
2026-08-12T17:38:27.541949484Z [err]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:163)
2026-08-12T17:38:27.541959021Z [err]  	at org.springframework.transaction.interceptor.TransactionAspectSupport.invokeWithinTransaction(TransactionAspectSupport.java:380)
2026-08-12T17:38:27.541968526Z [err]  	at org.springframework.transaction.interceptor.TransactionInterceptor.invoke(TransactionInterceptor.java:119)
2026-08-12T17:38:27.541975852Z [err]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:184)
2026-08-12T17:38:27.541985738Z [err]  	at org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:728)
2026-08-12T17:38:27.541994748Z [err]  	at com.jeevan.smart_notes_api.service.SubscriptionService$$SpringCGLIB$$0.createCheckoutSession(<generated>)
2026-08-12T17:38:27.542001814Z [err]  	at com.jeevan.smart_notes_api.controller.SubscriptionController.createCheckoutSession(SubscriptionController.java:50)
2026-08-12T17:38:27.545713745Z [err]  	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(Unknown Source)
2026-08-12T17:38:27.545723090Z [err]  	at java.base/java.lang.reflect.Method.invoke(Unknown Source)
2026-08-12T17:38:27.545727950Z [err]  	at org.springframework.web.method.support.InvocableHandlerMethod.doInvoke(InvocableHandlerMethod.java:258)
2026-08-12T17:38:27.545733969Z [err]  	at org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:191)
2026-08-12T17:38:27.545739805Z [err]  	at org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:118)
2026-08-12T17:38:27.545745178Z [err]  	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:991)
2026-08-12T17:38:27.545749960Z [err]  	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:896)
2026-08-12T17:38:27.545754429Z [err]  	at org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:87)
2026-08-12T17:38:27.545760742Z [err]  	at org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:1089)
2026-08-12T17:38:27.545771357Z [err]  	at org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:979)
2026-08-12T17:38:27.545775845Z [err]  	at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:1014)
2026-08-12T17:38:27.545780231Z [err]  	at org.springframework.web.servlet.FrameworkServlet.doPost(FrameworkServlet.java:914)
2026-08-12T17:38:27.545785337Z [err]  	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:590)
2026-08-12T17:38:27.545792050Z [err]  	at org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:885)
2026-08-12T17:38:27.549324131Z [err]  	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:658)
2026-08-12T17:38:27.549342655Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)
2026-08-12T17:38:27.549355096Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:38:27.549364623Z [err]  	at org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:51)
2026-08-12T17:38:27.549376377Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:38:27.549386411Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:38:27.549396190Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:110)
2026-08-12T17:38:27.549407044Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:38:27.549415662Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:38:27.549425189Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:108)
2026-08-12T17:38:27.549434032Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:108)
2026-08-12T17:38:27.549443493Z [err]  	at org.springframework.security.web.FilterChainProxy.lambda$doFilterInternal$3(FilterChainProxy.java:231)
2026-08-12T17:38:27.549452446Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:370)
2026-08-12T17:38:27.549460041Z [err]  	at org.springframework.security.web.access.intercept.AuthorizationFilter.doFilter(AuthorizationFilter.java:101)
2026-08-12T17:38:27.549469873Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:38:27.553521508Z [err]  	at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:125)
2026-08-12T17:38:27.553539389Z [err]  	at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:119)
2026-08-12T17:38:27.553549324Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:38:27.553558397Z [err]  	at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:131)
2026-08-12T17:38:27.553568086Z [err]  	at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:85)
2026-08-12T17:38:27.553577746Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:38:27.553586958Z [err]  	at org.springframework.security.web.authentication.AnonymousAuthenticationFilter.doFilter(AnonymousAuthenticationFilter.java:100)
2026-08-12T17:38:27.553595930Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:38:27.553604572Z [err]  	at org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter.doFilter(SecurityContextHolderAwareRequestFilter.java:179)
2026-08-12T17:38:27.553613965Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:38:27.553621956Z [err]  	at org.springframework.security.web.savedrequest.RequestCacheAwareFilter.doFilter(RequestCacheAwareFilter.java:63)
2026-08-12T17:38:27.553631216Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:38:27.553639298Z [err]  	at com.jeevan.smart_notes_api.security.jwt.JwtFilter.doFilterInternal(JwtFilter.java:74)
2026-08-12T17:38:27.559086236Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:38:27.559099042Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:38:27.559107011Z [err]  	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:107)
2026-08-12T17:38:27.559113852Z [err]  	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:93)
2026-08-12T17:38:27.559120730Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:38:27.559128980Z [err]  	at org.springframework.web.filter.CorsFilter.doFilterInternal(CorsFilter.java:91)
2026-08-12T17:38:27.559136086Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:38:27.559141506Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:38:27.559146857Z [err]  	at org.springframework.security.web.header.HeaderWriterFilter.doHeadersAfter(HeaderWriterFilter.java:90)
2026-08-12T17:38:27.559152921Z [err]  	at org.springframework.security.web.header.HeaderWriterFilter.doFilterInternal(HeaderWriterFilter.java:75)
2026-08-12T17:38:27.559174403Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:38:27.559193395Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:38:27.559198314Z [err]  	at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:82)
2026-08-12T17:38:27.559203588Z [err]  	at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:69)
2026-08-12T17:38:27.564519894Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:38:27.564541433Z [err]  	at org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter.doFilterInternal(WebAsyncManagerIntegrationFilter.java:62)
2026-08-12T17:38:27.564567025Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:38:27.564575751Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:38:27.564584687Z [err]  	at org.springframework.security.web.session.DisableEncodeUrlFilter.doFilterInternal(DisableEncodeUrlFilter.java:42)
2026-08-12T17:38:27.564597786Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:38:27.564608771Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:38:27.564620715Z [err]  	at org.springframework.security.web.FilterChainProxy.doFilterInternal(FilterChainProxy.java:233)
2026-08-12T17:38:27.564628911Z [err]  	at org.springframework.security.web.FilterChainProxy.doFilter(FilterChainProxy.java:191)
2026-08-12T17:38:27.564638003Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113)
2026-08-12T17:38:27.564645926Z [err]  	at org.springframework.web.filter.ServletRequestPathFilter.doFilter(ServletRequestPathFilter.java:52)
2026-08-12T17:38:27.564654794Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113)
2026-08-12T17:38:27.564663777Z [err]  	at org.springframework.web.filter.CompositeFilter.doFilter(CompositeFilter.java:74)
2026-08-12T17:38:27.564674562Z [err]  	at org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration$CompositeFilterChainProxy.doFilter(WebSecurityConfiguration.java:319)
2026-08-12T17:38:27.568277029Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113)
2026-08-12T17:38:27.568291092Z [err]  	at org.springframework.web.servlet.handler.HandlerMappingIntrospector.lambda$createCacheFilter$4(HandlerMappingIntrospector.java:267)
2026-08-12T17:38:27.568299510Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113)
2026-08-12T17:38:27.568305704Z [err]  	at org.springframework.web.filter.CompositeFilter.doFilter(CompositeFilter.java:74)
2026-08-12T17:38:27.568313462Z [err]  	at org.springframework.security.config.annotation.web.configuration.WebMvcSecurityConfiguration$CompositeFilterChainProxy.doFilter(WebMvcSecurityConfiguration.java:240)
2026-08-12T17:38:27.568321476Z [err]  	at org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:362)
2026-08-12T17:38:27.568329021Z [err]  	at org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:278)
2026-08-12T17:38:27.568335305Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:38:27.568341840Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:38:27.568350174Z [err]  	at org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:100)
2026-08-12T17:38:27.568357205Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:38:27.568363456Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:38:27.568369421Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:38:27.568375828Z [err]  	at org.springframework.web.filter.FormContentFilter.doFilterInternal(FormContentFilter.java:93)
2026-08-12T17:38:28.415741952Z [err]  	at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:88)
2026-08-12T17:38:28.415754127Z [err]  	at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:492)
2026-08-12T17:38:28.415762371Z [err]  	at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:113)
2026-08-12T17:38:28.415841513Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:38:28.415847352Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:38:28.415852678Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:38:28.415858728Z [err]  	at org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:201)
2026-08-12T17:38:28.415864613Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:38:28.415870987Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:38:28.415877437Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:38:28.415884784Z [err]  	at org.springframework.web.filter.ForwardedHeaderFilter.doFilterInternal(ForwardedHeaderFilter.java:173)
2026-08-12T17:38:28.415891946Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:38:28.415898125Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:38:28.415904059Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:38:28.415910653Z [err]  	at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:165)
2026-08-12T17:38:28.420319105Z [err]  Caused by: com.razorpay.RazorpayException: BAD_REQUEST_ERROR:Customer already exists for the merchant
2026-08-12T17:38:28.420340164Z [err]  	at com.razorpay.ApiClient.throwException(ApiClient.java:228)
2026-08-12T17:38:28.420346771Z [err]  	at com.razorpay.ApiClient.processResponse(ApiClient.java:180)
2026-08-12T17:38:28.420351851Z [err]  	at com.razorpay.ApiClient.post(ApiClient.java:55)
2026-08-12T17:38:28.420357487Z [err]  	at com.razorpay.CustomerClient.post(CustomerClient.java:7)
2026-08-12T17:38:28.420432511Z [err]  	at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:83)
2026-08-12T17:38:28.420439735Z [err]  	at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:72)
2026-08-12T17:38:28.420457420Z [err]  	at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:342)
2026-08-12T17:38:28.420466420Z [err]  	at org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:399)
2026-08-12T17:38:28.420473093Z [err]  	at org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:63)
2026-08-12T17:38:28.420480133Z [err]  	at org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:903)
2026-08-12T17:38:28.420486884Z [err]  	at org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1797)
2026-08-12T17:38:28.420495243Z [err]  	at org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:52)
2026-08-12T17:38:28.420501573Z [err]  	at org.apache.tomcat.util.threads.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:973)
2026-08-12T17:38:28.420508798Z [err]  	at org.apache.tomcat.util.threads.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:491)
2026-08-12T17:38:28.420515836Z [err]  	at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:63)
2026-08-12T17:38:28.420523359Z [err]  	at java.base/java.lang.Thread.run(Unknown Source)
2026-08-12T17:38:28.421069751Z [err]  	at com.razorpay.ApiClient.post(ApiClient.java:50)
2026-08-12T17:38:28.421074625Z [err]  	at com.razorpay.CustomerClient.post(CustomerClient.java:7)
2026-08-12T17:38:28.421080673Z [err]  	at com.razorpay.CustomerClient.create(CustomerClient.java:14)
2026-08-12T17:38:28.421085700Z [err]  	at com.jeevan.smart_notes_api.service.RazorpayService.getOrCreateCustomer(RazorpayService.java:51)
2026-08-12T17:38:28.421091844Z [err]  	... 123 more
2026-08-12T17:38:29.399538578Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:38:29.399544234Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:38:31.625141751Z [inf]  2026-08-12T17:38:29.581Z ERROR 1 --- [smart-notes-api] [nio-8080-exec-7] c.j.s.service.RazorpayService            : Failed to create Razorpay customer for user 1
2026-08-12T17:38:31.625147654Z [inf]  
2026-08-12T17:38:31.625153443Z [inf]  com.razorpay.RazorpayException: BAD_REQUEST_ERROR:Customer already exists for the merchant
2026-08-12T17:38:31.625158670Z [inf]  	at com.razorpay.ApiClient.throwException(ApiClient.java:228) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:38:31.625161288Z [inf]  	at com.razorpay.ApiClient.post(ApiClient.java:55) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:38:31.625162148Z [inf]  	at java.base/java.lang.reflect.Method.invoke(Unknown Source) ~[na:na]
2026-08-12T17:38:31.625167004Z [inf]  	at com.razorpay.ApiClient.processResponse(ApiClient.java:180) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:38:31.625171773Z [inf]  	at org.springframework.aop.support.AopUtils.invokeJoinpointUsingReflection(AopUtils.java:360) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:31.625176647Z [inf]  	at com.razorpay.CustomerClient.post(CustomerClient.java:7) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:38:31.625184117Z [inf]  	at com.razorpay.ApiClient.post(ApiClient.java:50) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:38:31.625193780Z [inf]  	at com.razorpay.CustomerClient.post(CustomerClient.java:7) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:38:31.625201129Z [inf]  	at com.razorpay.CustomerClient.create(CustomerClient.java:14) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:38:31.625208138Z [inf]  	at com.jeevan.smart_notes_api.service.RazorpayService.getOrCreateCustomer(RazorpayService.java:51) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:38:31.625214211Z [inf]  	at com.jeevan.smart_notes_api.service.SubscriptionService.createCheckoutSession(SubscriptionService.java:163) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:38:31.625220889Z [inf]  	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(Unknown Source) ~[na:na]
2026-08-12T17:38:32.622573666Z [inf]  	at com.jeevan.smart_notes_api.service.SubscriptionService$$SpringCGLIB$$0.createCheckoutSession(<generated>) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:38:32.622585442Z [inf]  	at com.jeevan.smart_notes_api.controller.SubscriptionController.createCheckoutSession(SubscriptionController.java:50) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:38:32.622593347Z [inf]  	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(Unknown Source) ~[na:na]
2026-08-12T17:38:32.622597453Z [inf]  	at org.springframework.transaction.interceptor.TransactionAspectSupport.invokeWithinTransaction(TransactionAspectSupport.java:380) ~[spring-tx-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:32.622601372Z [inf]  	at java.base/java.lang.reflect.Method.invoke(Unknown Source) ~[na:na]
2026-08-12T17:38:32.622608023Z [inf]  	at org.springframework.transaction.interceptor.TransactionInterceptor.invoke(TransactionInterceptor.java:119) ~[spring-tx-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:32.622610849Z [inf]  	at org.springframework.web.method.support.InvocableHandlerMethod.doInvoke(InvocableHandlerMethod.java:258) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:32.622619358Z [inf]  	at org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:191) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:32.622620322Z [inf]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:184) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:32.622625783Z [inf]  	at org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:728) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:32.622663915Z [inf]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.invokeJoinpoint(ReflectiveMethodInvocation.java:196) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:32.622673206Z [inf]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:163) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:32.629050749Z [inf]  	at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:1014) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:32.629063758Z [inf]  	at org.springframework.web.servlet.FrameworkServlet.doPost(FrameworkServlet.java:914) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:32.629072253Z [inf]  	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:590) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:32.629081617Z [inf]  	at org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:885) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:32.629088543Z [inf]  	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:658) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:32.629097564Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:32.629147941Z [inf]  	at org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:118) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:32.629156196Z [inf]  	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:991) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:32.629162865Z [inf]  	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:896) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:32.629170971Z [inf]  	at org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:87) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:32.629176670Z [inf]  	at org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:1089) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:32.629182697Z [inf]  	at org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:979) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:33.567616732Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:33.567623767Z [inf]  	at org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:51) ~[tomcat-embed-websocket-10.1.54.jar!/:na]
2026-08-12T17:38:33.567629496Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:33.567634405Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:33.567640120Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:110) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:33.567650911Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:33.567654781Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:33.567659800Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:108) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:33.567664558Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:108) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:33.567670680Z [inf]  	at org.springframework.security.web.FilterChainProxy.lambda$doFilterInternal$3(FilterChainProxy.java:231) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:33.567675122Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:370) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:33.567680295Z [inf]  	at org.springframework.security.web.access.intercept.AuthorizationFilter.doFilter(AuthorizationFilter.java:101) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:33.570210494Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:33.570215679Z [inf]  	at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:125) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:33.570222179Z [inf]  	at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:119) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:33.570227825Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:33.570235702Z [inf]  	at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:131) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:33.570241864Z [inf]  	at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:85) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:33.570248230Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:33.570254613Z [inf]  	at org.springframework.security.web.authentication.AnonymousAuthenticationFilter.doFilter(AnonymousAuthenticationFilter.java:100) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:33.570260446Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:33.570266332Z [inf]  	at org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter.doFilter(SecurityContextHolderAwareRequestFilter.java:179) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:33.570274493Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:33.572073528Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:33.572085037Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:33.572093131Z [inf]  	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:107) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:33.572099715Z [inf]  	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:93) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:33.572106882Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:33.572114688Z [inf]  	at org.springframework.web.filter.CorsFilter.doFilterInternal(CorsFilter.java:91) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:33.572121913Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:33.572128729Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:33.572168556Z [inf]  	at org.springframework.security.web.savedrequest.RequestCacheAwareFilter.doFilter(RequestCacheAwareFilter.java:63) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:33.572175937Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:33.572182655Z [inf]  	at com.jeevan.smart_notes_api.security.jwt.JwtFilter.doFilterInternal(JwtFilter.java:74) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:38:33.577059329Z [inf]  	at org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter.doFilterInternal(WebAsyncManagerIntegrationFilter.java:62) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:33.577072818Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:33.577083340Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:33.577089001Z [inf]  	at org.springframework.security.web.header.HeaderWriterFilter.doHeadersAfter(HeaderWriterFilter.java:90) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:33.577091303Z [inf]  	at org.springframework.security.web.session.DisableEncodeUrlFilter.doFilterInternal(DisableEncodeUrlFilter.java:42) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:33.577108476Z [inf]  	at org.springframework.security.web.header.HeaderWriterFilter.doFilterInternal(HeaderWriterFilter.java:75) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:33.577109832Z [inf]  	at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:82) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:33.577118930Z [inf]  	at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:69) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:33.577123129Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:33.577126837Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:33.577134353Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:33.579304884Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:33.579310856Z [inf]  	at org.springframework.web.servlet.handler.HandlerMappingIntrospector.lambda$createCacheFilter$4(HandlerMappingIntrospector.java:267) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:33.579428671Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:33.579438094Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:33.579444885Z [inf]  	at org.springframework.security.web.FilterChainProxy.doFilterInternal(FilterChainProxy.java:233) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:33.579452241Z [inf]  	at org.springframework.security.web.FilterChainProxy.doFilter(FilterChainProxy.java:191) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:33.579462547Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:33.579467835Z [inf]  	at org.springframework.web.filter.ServletRequestPathFilter.doFilter(ServletRequestPathFilter.java:52) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:33.579474502Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:33.579481209Z [inf]  	at org.springframework.web.filter.CompositeFilter.doFilter(CompositeFilter.java:74) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:33.579486782Z [inf]  	at org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration$CompositeFilterChainProxy.doFilter(WebSecurityConfiguration.java:319) ~[spring-security-config-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:33.582145117Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:33.582160458Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:33.582169957Z [inf]  	at org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:100) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:33.582179341Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:33.582193964Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:33.582203075Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:33.582213242Z [inf]  	at org.springframework.web.filter.FormContentFilter.doFilterInternal(FormContentFilter.java:93) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:33.582273042Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:33.582280280Z [inf]  	at org.springframework.web.filter.CompositeFilter.doFilter(CompositeFilter.java:74) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:33.582285591Z [inf]  	at org.springframework.security.config.annotation.web.configuration.WebMvcSecurityConfiguration$CompositeFilterChainProxy.doFilter(WebMvcSecurityConfiguration.java:240) ~[spring-security-config-6.5.10.jar!/:6.5.10]
2026-08-12T17:38:33.582291860Z [inf]  	at org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:362) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:33.582297247Z [inf]  	at org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:278) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:33.589218197Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:33.589239377Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:33.589247600Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:33.589256798Z [inf]  	at org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:201) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:33.589266551Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:33.589273669Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:33.589282245Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:33.589289548Z [inf]  	at org.springframework.web.filter.ForwardedHeaderFilter.doFilterInternal(ForwardedHeaderFilter.java:173) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:33.589296715Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:38:33.589304546Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:33.589311245Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:33.589319074Z [inf]  	at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:165) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:33.592274506Z [inf]  	at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:88) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:33.592283361Z [inf]  	at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:492) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:33.592290382Z [inf]  	at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:113) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:33.592296815Z [inf]  	at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:83) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:33.592334576Z [inf]  	at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:72) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:33.592341950Z [inf]  	at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:342) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:33.592348168Z [inf]  	at org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:399) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:33.592354652Z [inf]  	at org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:63) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:33.592360399Z [inf]  	at org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:903) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:33.592368713Z [inf]  	at org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1797) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:33.592379415Z [inf]  	at org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:52) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:33.592385048Z [inf]  	at org.apache.tomcat.util.threads.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:973) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:33.596845720Z [inf]  	at org.apache.tomcat.util.threads.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:491) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:33.596845773Z [err]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.invokeJoinpoint(ReflectiveMethodInvocation.java:196)
2026-08-12T17:38:33.596858605Z [err]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:163)
2026-08-12T17:38:33.596861426Z [inf]  	at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:63) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:38:33.596872345Z [inf]  	at java.base/java.lang.Thread.run(Unknown Source) ~[na:na]
2026-08-12T17:38:33.596878080Z [err]  	at org.springframework.transaction.interceptor.TransactionAspectSupport.invokeWithinTransaction(TransactionAspectSupport.java:380)
2026-08-12T17:38:33.596880071Z [inf]  
2026-08-12T17:38:33.596885751Z [err]  	at org.springframework.transaction.interceptor.TransactionInterceptor.invoke(TransactionInterceptor.java:119)
2026-08-12T17:38:33.596890756Z [err]  java.lang.RuntimeException: Failed to create Razorpay customer
2026-08-12T17:38:33.596893110Z [err]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:184)
2026-08-12T17:38:33.596901816Z [err]  	at com.jeevan.smart_notes_api.service.RazorpayService.getOrCreateCustomer(RazorpayService.java:55)
2026-08-12T17:38:33.596911133Z [err]  	at com.jeevan.smart_notes_api.service.SubscriptionService.createCheckoutSession(SubscriptionService.java:163)
2026-08-12T17:38:33.596918982Z [err]  	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(Unknown Source)
2026-08-12T17:38:33.596925965Z [err]  	at java.base/java.lang.reflect.Method.invoke(Unknown Source)
2026-08-12T17:38:33.596934195Z [err]  	at org.springframework.aop.support.AopUtils.invokeJoinpointUsingReflection(AopUtils.java:360)
2026-08-12T17:38:33.599417465Z [err]  	at org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:728)
2026-08-12T17:38:33.599429220Z [err]  	at com.jeevan.smart_notes_api.service.SubscriptionService$$SpringCGLIB$$0.createCheckoutSession(<generated>)
2026-08-12T17:38:33.599437018Z [err]  	at com.jeevan.smart_notes_api.controller.SubscriptionController.createCheckoutSession(SubscriptionController.java:50)
2026-08-12T17:38:33.599443911Z [err]  	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(Unknown Source)
2026-08-12T17:38:33.599453022Z [err]  	at java.base/java.lang.reflect.Method.invoke(Unknown Source)
2026-08-12T17:38:33.599464636Z [err]  	at org.springframework.web.method.support.InvocableHandlerMethod.doInvoke(InvocableHandlerMethod.java:258)
2026-08-12T17:38:33.599471349Z [err]  	at org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:191)
2026-08-12T17:38:33.599478013Z [err]  	at org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:118)
2026-08-12T17:38:33.599485111Z [err]  	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:991)
2026-08-12T17:38:33.599492006Z [err]  	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:896)
2026-08-12T17:38:33.599498491Z [err]  	at org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:87)
2026-08-12T17:38:33.599504265Z [err]  	at org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:1089)
2026-08-12T17:38:33.599510603Z [err]  	at org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:979)
2026-08-12T17:38:33.599517924Z [err]  	at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:1014)
2026-08-12T17:38:33.602427589Z [err]  	at org.springframework.web.servlet.FrameworkServlet.doPost(FrameworkServlet.java:914)
2026-08-12T17:38:33.602439254Z [err]  	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:590)
2026-08-12T17:38:33.602444730Z [err]  	at org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:885)
2026-08-12T17:38:33.602449523Z [err]  	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:658)
2026-08-12T17:38:33.602456976Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)
2026-08-12T17:38:33.602461312Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:38:33.602467896Z [err]  	at org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:51)
2026-08-12T17:38:33.602472368Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:38:33.602476288Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:38:33.602480005Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:110)
2026-08-12T17:38:33.602484129Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:38:33.602490800Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:38:33.602495523Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:108)
2026-08-12T17:38:33.602499924Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:108)
2026-08-12T17:38:33.602504407Z [err]  	at org.springframework.security.web.FilterChainProxy.lambda$doFilterInternal$3(FilterChainProxy.java:231)
2026-08-12T17:38:33.602509088Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:370)
2026-08-12T17:38:33.609050910Z [err]  	at org.springframework.security.web.access.intercept.AuthorizationFilter.doFilter(AuthorizationFilter.java:101)
2026-08-12T17:38:33.609062404Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:38:33.609069945Z [err]  	at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:125)
2026-08-12T17:38:33.609076045Z [err]  	at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:119)
2026-08-12T17:38:33.609084750Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:38:33.609091107Z [err]  	at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:131)
2026-08-12T17:38:33.609096733Z [err]  	at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:85)
2026-08-12T17:38:33.609102383Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:38:33.609119672Z [err]  	at org.springframework.security.web.authentication.AnonymousAuthenticationFilter.doFilter(AnonymousAuthenticationFilter.java:100)
2026-08-12T17:38:33.609128234Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:38:33.609135708Z [err]  	at org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter.doFilter(SecurityContextHolderAwareRequestFilter.java:179)
2026-08-12T17:38:33.609142840Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:38:33.609148418Z [err]  	at org.springframework.security.web.savedrequest.RequestCacheAwareFilter.doFilter(RequestCacheAwareFilter.java:63)
2026-08-12T17:38:33.613295036Z [err]  	at org.springframework.web.filter.CorsFilter.doFilterInternal(CorsFilter.java:91)
2026-08-12T17:38:33.613306925Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:38:33.613313972Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:38:33.613320584Z [err]  	at org.springframework.security.web.header.HeaderWriterFilter.doHeadersAfter(HeaderWriterFilter.java:90)
2026-08-12T17:38:33.613322871Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:38:33.613332274Z [err]  	at com.jeevan.smart_notes_api.security.jwt.JwtFilter.doFilterInternal(JwtFilter.java:74)
2026-08-12T17:38:33.613333485Z [err]  	at org.springframework.security.web.header.HeaderWriterFilter.doFilterInternal(HeaderWriterFilter.java:75)
2026-08-12T17:38:33.613342294Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:38:33.613348070Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:38:33.613351709Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:38:33.613355303Z [err]  	at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:82)
2026-08-12T17:38:33.613359485Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:38:33.613366654Z [err]  	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:107)
2026-08-12T17:38:33.613373002Z [err]  	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:93)
2026-08-12T17:38:33.613382080Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:38:33.617931308Z [err]  	at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:69)
2026-08-12T17:38:33.617948388Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:38:33.617960474Z [err]  	at org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter.doFilterInternal(WebAsyncManagerIntegrationFilter.java:62)
2026-08-12T17:38:33.617969785Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:38:33.617980191Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:38:33.617990593Z [err]  	at org.springframework.security.web.session.DisableEncodeUrlFilter.doFilterInternal(DisableEncodeUrlFilter.java:42)
2026-08-12T17:38:33.618000975Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:38:33.618009732Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:38:33.618026895Z [err]  	at org.springframework.security.web.FilterChainProxy.doFilterInternal(FilterChainProxy.java:233)
2026-08-12T17:38:33.618038494Z [err]  	at org.springframework.security.web.FilterChainProxy.doFilter(FilterChainProxy.java:191)
2026-08-12T17:38:33.618047737Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113)
2026-08-12T17:38:33.618056578Z [err]  	at org.springframework.web.filter.ServletRequestPathFilter.doFilter(ServletRequestPathFilter.java:52)
2026-08-12T17:38:33.618064988Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113)
2026-08-12T17:38:33.618076690Z [err]  	at org.springframework.web.filter.CompositeFilter.doFilter(CompositeFilter.java:74)
2026-08-12T17:38:33.621268621Z [err]  	at org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration$CompositeFilterChainProxy.doFilter(WebSecurityConfiguration.java:319)
2026-08-12T17:38:33.621277478Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113)
2026-08-12T17:38:33.621283339Z [err]  	at org.springframework.web.servlet.handler.HandlerMappingIntrospector.lambda$createCacheFilter$4(HandlerMappingIntrospector.java:267)
2026-08-12T17:38:33.621293172Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113)
2026-08-12T17:38:33.621298596Z [err]  	at org.springframework.web.filter.CompositeFilter.doFilter(CompositeFilter.java:74)
2026-08-12T17:38:33.621304919Z [err]  	at org.springframework.security.config.annotation.web.configuration.WebMvcSecurityConfiguration$CompositeFilterChainProxy.doFilter(WebMvcSecurityConfiguration.java:240)
2026-08-12T17:38:33.621311889Z [err]  	at org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:362)
2026-08-12T17:38:33.621319856Z [err]  	at org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:278)
2026-08-12T17:38:33.621328002Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:38:33.621333501Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:38:33.621338977Z [err]  	at org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:100)
2026-08-12T17:38:33.621344692Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:38:33.621350753Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:38:33.621358649Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:38:33.624177310Z [err]  	at org.springframework.web.filter.FormContentFilter.doFilterInternal(FormContentFilter.java:93)
2026-08-12T17:38:33.624190665Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:38:33.624198143Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:38:33.624207920Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:38:33.624214907Z [err]  	at org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:201)
2026-08-12T17:38:33.624216207Z [err]  	at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:165)
2026-08-12T17:38:33.624221779Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:38:33.624233547Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:38:33.624239986Z [err]  	at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:88)
2026-08-12T17:38:33.624241245Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:38:33.624250693Z [err]  	at org.springframework.web.filter.ForwardedHeaderFilter.doFilterInternal(ForwardedHeaderFilter.java:173)
2026-08-12T17:38:33.624254157Z [err]  	at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:492)
2026-08-12T17:38:33.624259127Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:38:33.624265414Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:38:33.624272176Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:38:33.629676667Z [err]  	at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:113)
2026-08-12T17:38:33.629687754Z [err]  	at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:83)
2026-08-12T17:38:33.629697064Z [err]  	at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:72)
2026-08-12T17:38:33.629704055Z [err]  	at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:342)
2026-08-12T17:38:33.629713749Z [err]  	at org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:399)
2026-08-12T17:38:33.629720779Z [err]  	at org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:63)
2026-08-12T17:38:33.629727513Z [err]  	at org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:903)
2026-08-12T17:38:33.629734449Z [err]  	at org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1797)
2026-08-12T17:38:33.629741717Z [err]  	at org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:52)
2026-08-12T17:38:33.629747618Z [err]  	at org.apache.tomcat.util.threads.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:973)
2026-08-12T17:38:33.629756430Z [err]  	at org.apache.tomcat.util.threads.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:491)
2026-08-12T17:38:33.629763821Z [err]  	at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:63)
2026-08-12T17:38:33.629770242Z [err]  	at java.base/java.lang.Thread.run(Unknown Source)
2026-08-12T17:38:33.629777414Z [err]  Caused by: com.razorpay.RazorpayException: BAD_REQUEST_ERROR:Customer already exists for the merchant
2026-08-12T17:38:33.629783224Z [err]  	at com.razorpay.ApiClient.throwException(ApiClient.java:228)
2026-08-12T17:38:33.629791787Z [err]  	at com.razorpay.ApiClient.processResponse(ApiClient.java:180)
2026-08-12T17:38:33.629797531Z [err]  	at com.razorpay.ApiClient.post(ApiClient.java:55)
2026-08-12T17:38:33.629804137Z [err]  	at com.razorpay.CustomerClient.post(CustomerClient.java:7)
2026-08-12T17:38:33.629810262Z [err]  	at com.razorpay.ApiClient.post(ApiClient.java:50)
2026-08-12T17:38:33.629817898Z [err]  	at com.razorpay.CustomerClient.post(CustomerClient.java:7)
2026-08-12T17:38:33.629828385Z [err]  	at com.razorpay.CustomerClient.create(CustomerClient.java:14)
2026-08-12T17:38:33.629836269Z [err]  	at com.jeevan.smart_notes_api.service.RazorpayService.getOrCreateCustomer(RazorpayService.java:51)
2026-08-12T17:38:33.629844408Z [err]  	... 123 more
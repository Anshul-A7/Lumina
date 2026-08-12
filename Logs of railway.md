2026-08-12T17:20:36.670668549Z [inf]  Starting Container
2026-08-12T17:20:37.655175379Z [inf]  
2026-08-12T17:20:37.655178509Z [inf]    .   ____          _            __ _ _
2026-08-12T17:20:37.655181069Z [inf]   /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
2026-08-12T17:20:37.655183459Z [inf]  ( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
2026-08-12T17:20:37.655186089Z [inf]   \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
2026-08-12T17:20:37.655188829Z [inf]    '  |____| .__|_| |_|_| |_\__, | / / / /
2026-08-12T17:20:37.655192829Z [inf]   =========|_|==============|___/=/_/_/_/
2026-08-12T17:20:37.655195469Z [inf]  
2026-08-12T17:20:37.655198229Z [inf]   :: Spring Boot ::               (v3.5.14)
2026-08-12T17:20:37.655201359Z [inf]  
2026-08-12T17:20:37.655203729Z [inf]  2026-08-12T17:20:37.337Z  INFO 1 --- [smart-notes-api] [           main] c.j.s.SmartNotesApiApplication           : Starting SmartNotesApiApplication v0.0.1-SNAPSHOT using Java 21.0.11 with PID 1 (/app/app.jar started by spring in /app)
2026-08-12T17:20:37.655206389Z [inf]  2026-08-12T17:20:37.339Z  INFO 1 --- [smart-notes-api] [           main] c.j.s.SmartNotesApiApplication           : No active profile set, falling back to 1 default profile: "default"
2026-08-12T17:20:38.518729857Z [inf]  2026-08-12T17:20:38.501Z  INFO 1 --- [smart-notes-api] [           main] .s.d.r.c.RepositoryConfigurationDelegate : Bootstrapping Spring Data JPA repositories in DEFAULT mode.
2026-08-12T17:20:38.656663920Z [inf]  2026-08-12T17:20:38.646Z  INFO 1 --- [smart-notes-api] [           main] .s.d.r.c.RepositoryConfigurationDelegate : Finished Spring Data repository scanning in 138 ms. Found 18 JPA repository interfaces.
2026-08-12T17:20:39.102328267Z [inf]  2026-08-12T17:20:39.094Z  INFO 1 --- [smart-notes-api] [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port 8080 (http)
2026-08-12T17:20:39.106715159Z [inf]  2026-08-12T17:20:39.105Z  INFO 1 --- [smart-notes-api] [           main] o.apache.catalina.core.StandardService   : Starting service [Tomcat]
2026-08-12T17:20:39.106719949Z [inf]  2026-08-12T17:20:39.105Z  INFO 1 --- [smart-notes-api] [           main] o.apache.catalina.core.StandardEngine    : Starting Servlet engine: [Apache Tomcat/10.1.54]
2026-08-12T17:20:39.149237674Z [inf]  2026-08-12T17:20:39.134Z  INFO 1 --- [smart-notes-api] [           main] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext
2026-08-12T17:20:39.149243684Z [inf]  2026-08-12T17:20:39.135Z  INFO 1 --- [smart-notes-api] [           main] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 1736 ms
2026-08-12T17:20:39.289949136Z [inf]  2026-08-12T17:20:39.269Z  INFO 1 --- [smart-notes-api] [           main] o.hibernate.jpa.internal.util.LogHelper  : HHH000204: Processing PersistenceUnitInfo [name: default]
2026-08-12T17:20:39.310483862Z [inf]  2026-08-12T17:20:39.303Z  INFO 1 --- [smart-notes-api] [           main] org.hibernate.Version                    : HHH000412: Hibernate ORM core version 6.6.49.Final
2026-08-12T17:20:39.331530141Z [inf]  2026-08-12T17:20:39.326Z  INFO 1 --- [smart-notes-api] [           main] o.h.c.internal.RegionFactoryInitiator    : HHH000026: Second-level cache disabled
2026-08-12T17:20:39.487822643Z [inf]  2026-08-12T17:20:39.471Z  INFO 1 --- [smart-notes-api] [           main] o.s.o.j.p.SpringPersistenceUnitInfo      : No LoadTimeWeaver setup: ignoring JPA class transformer
2026-08-12T17:20:39.497054952Z [inf]  2026-08-12T17:20:39.491Z  INFO 1 --- [smart-notes-api] [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Starting...
2026-08-12T17:20:41.795600277Z [inf]  2026-08-12T17:20:41.472Z  INFO 1 --- [smart-notes-api] [           main] com.zaxxer.hikari.pool.HikariPool        : HikariPool-1 - Added connection org.postgresql.jdbc.PgConnection@3e63bd6b
2026-08-12T17:20:41.795604067Z [inf]  2026-08-12T17:20:41.473Z  INFO 1 --- [smart-notes-api] [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Start completed.
2026-08-12T17:20:42.448260774Z [inf]  2026-08-12T17:20:42.426Z  INFO 1 --- [smart-notes-api] [           main] org.hibernate.orm.connections.pooling    : HHH10001005: Database info:
2026-08-12T17:20:42.448265044Z [inf]  	Database JDBC URL [Connecting through datasource 'HikariDataSource (HikariPool-1)']
2026-08-12T17:20:42.448269044Z [inf]  	Database driver: undefined/unknown
2026-08-12T17:20:42.448272764Z [inf]  	Database version: 18.4
2026-08-12T17:20:42.448276094Z [inf]  	Autocommit mode: undefined/unknown
2026-08-12T17:20:42.448279244Z [inf]  	Isolation level: undefined/unknown
2026-08-12T17:20:42.448282684Z [inf]  	Minimum pool size: undefined/unknown
2026-08-12T17:20:42.448286694Z [inf]  	Maximum pool size: undefined/unknown
2026-08-12T17:20:43.195736685Z [inf]  2026-08-12T17:20:43.148Z  INFO 1 --- [smart-notes-api] [           main] o.h.e.t.j.p.i.JtaPlatformInitiator       : HHH000489: No JTA platform available (set 'hibernate.transaction.jta.platform' to enable JTA platform integration)
2026-08-12T17:21:03.194243283Z [inf]  2026-08-12T17:20:53.972Z  INFO 1 --- [smart-notes-api] [           main] j.LocalContainerEntityManagerFactoryBean : Initialized JPA EntityManagerFactory for persistence unit 'default'
2026-08-12T17:21:03.194248483Z [inf]  2026-08-12T17:20:54.372Z  INFO 1 --- [smart-notes-api] [           main] c.j.smart_notes_api.config.AiConfig      : ✅ Added Gemini slot [AQ.A...AuFw]
2026-08-12T17:21:03.194253173Z [inf]  2026-08-12T17:20:54.373Z  INFO 1 --- [smart-notes-api] [           main] c.j.smart_notes_api.config.AiConfig      : ✅ Added Gemini slot [AQ.A...0wGg]
2026-08-12T17:21:03.194257083Z [inf]  2026-08-12T17:20:54.374Z  INFO 1 --- [smart-notes-api] [           main] c.j.smart_notes_api.config.AiConfig      : ✅ Added Groq slot [gsk_...yhvA]
2026-08-12T17:21:03.194261272Z [inf]  2026-08-12T17:20:54.375Z  INFO 1 --- [smart-notes-api] [           main] c.j.s.config.AiProviderPool              : ═══════════════════════════════════════════════════════════════
2026-08-12T17:21:03.194266012Z [inf]  2026-08-12T17:20:54.375Z  INFO 1 --- [smart-notes-api] [           main] c.j.s.config.AiProviderPool              : 🚀 AI Provider Pool initialized with 3 total slots:
2026-08-12T17:21:03.194270022Z [inf]  2026-08-12T17:20:54.375Z  INFO 1 --- [smart-notes-api] [           main] c.j.s.config.AiProviderPool              :    ├─ GEMINI [AQ.A****AuFw]
2026-08-12T17:21:03.194275112Z [inf]  2026-08-12T17:20:54.375Z  INFO 1 --- [smart-notes-api] [           main] c.j.s.config.AiProviderPool              :    ├─ GEMINI [AQ.A****0wGg]
2026-08-12T17:21:03.194279932Z [inf]  2026-08-12T17:20:54.375Z  INFO 1 --- [smart-notes-api] [           main] c.j.s.config.AiProviderPool              :    ├─ GROQ [gsk_****yhvA]
2026-08-12T17:21:03.194284972Z [inf]  2026-08-12T17:20:54.375Z  INFO 1 --- [smart-notes-api] [           main] c.j.s.config.AiProviderPool              : ═══════════════════════════════════════════════════════════════
2026-08-12T17:21:03.194695247Z [inf]  2026-08-12T17:20:54.408Z  INFO 1 --- [smart-notes-api] [           main] o.s.d.j.r.query.QueryEnhancerFactory     : Hibernate is in classpath; If applicable, HQL parser will be used.
2026-08-12T17:21:03.194699457Z [inf]  2026-08-12T17:20:54.844Z  INFO 1 --- [smart-notes-api] [           main] c.j.smart_notes_api.service.AiService    : 🤖 AiService initialized with AiProviderPool (failover enabled)
2026-08-12T17:21:03.194702127Z [inf]  2026-08-12T17:20:54.890Z  INFO 1 --- [smart-notes-api] [           main] eAuthenticationProviderManagerConfigurer : Global AuthenticationManager configured with AuthenticationProvider bean with name authenticationProvider
2026-08-12T17:21:03.194705167Z [inf]  2026-08-12T17:20:54.890Z  WARN 1 --- [smart-notes-api] [           main] r$InitializeUserDetailsManagerConfigurer : Global AuthenticationManager configured with an AuthenticationProvider bean. UserDetailsService beans will not be used by Spring Security for automatically configuring username/password login. Consider removing the AuthenticationProvider bean. Alternatively, consider using the UserDetailsService in a manually instantiated DaoAuthenticationProvider. If the current configuration is intentional, to turn off this warning, increase the logging level of 'org.springframework.security.config.annotation.authentication.configuration.InitializeUserDetailsBeanManagerConfigurer' to ERROR
2026-08-12T17:21:03.194707867Z [inf]  2026-08-12T17:20:55.297Z  WARN 1 --- [smart-notes-api] [           main] JpaBaseConfiguration$JpaWebConfiguration : spring.jpa.open-in-view is enabled by default. Therefore, database queries may be performed during view rendering. Explicitly configure spring.jpa.open-in-view to disable this warning
2026-08-12T17:21:03.194711527Z [inf]  2026-08-12T17:20:55.999Z  INFO 1 --- [smart-notes-api] [           main] o.s.m.s.b.SimpleBrokerMessageHandler     : Starting...
2026-08-12T17:21:03.194713717Z [inf]  2026-08-12T17:20:56.000Z  INFO 1 --- [smart-notes-api] [           main] o.s.m.s.b.SimpleBrokerMessageHandler     : BrokerAvailabilityEvent[available=true, SimpleBrokerMessageHandler [org.springframework.messaging.simp.broker.DefaultSubscriptionRegistry@385376c]]
2026-08-12T17:21:03.195286102Z [inf]  2026-08-12T17:20:56.000Z  INFO 1 --- [smart-notes-api] [           main] o.s.m.s.b.SimpleBrokerMessageHandler     : Started.
2026-08-12T17:21:03.195292551Z [inf]  2026-08-12T17:20:56.011Z  INFO 1 --- [smart-notes-api] [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port 8080 (http) with context path '/'
2026-08-12T17:21:03.195296161Z [inf]  2026-08-12T17:20:56.024Z  INFO 1 --- [smart-notes-api] [           main] c.j.s.SmartNotesApiApplication           : Started SmartNotesApiApplication in 19.127 seconds (process running for 19.623)
2026-08-12T17:21:23.110155009Z [inf]  2026-08-12T17:21:18.995Z  INFO 1 --- [smart-notes-api] [nio-8080-exec-1] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring DispatcherServlet 'dispatcherServlet'
2026-08-12T17:21:23.110160989Z [inf]  2026-08-12T17:21:18.996Z  INFO 1 --- [smart-notes-api] [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : Initializing Servlet 'dispatcherServlet'
2026-08-12T17:21:23.110165019Z [inf]  2026-08-12T17:21:18.997Z  INFO 1 --- [smart-notes-api] [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : Completed initialization in 1 ms
2026-08-12T17:21:23.110170379Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:21:23.110173859Z [inf]  Hibernate: select ut1_0.id,ut1_0.ai_requests,ut1_0.images_attached,ut1_0.images_generated,ut1_0.pdfs_attached,ut1_0.pdfs_generated,ut1_0.usage_date,ut1_0.user_id from usage_tracker ut1_0 left join users u1_0 on u1_0.id=ut1_0.user_id where u1_0.email=? and ut1_0.usage_date=?
2026-08-12T17:21:23.110177439Z [inf]  Hibernate: update usage_tracker set ai_requests=?,images_attached=?,images_generated=?,pdfs_attached=?,pdfs_generated=?,usage_date=?,user_id=? where id=?
2026-08-12T17:21:30.890428709Z [inf]  2026-08-12T17:21:30.861Z  WARN 1 --- [smart-notes-api] [or-http-epoll-3] r.netty.http.client.HttpClientConnect    : [eb3486a0-1, L:/10.204.93.30:36130 - R:generativelanguage.googleapis.com/172.217.113.4:443] The connection observed an error
2026-08-12T17:21:30.890431649Z [inf]  
2026-08-12T17:21:30.890435109Z [inf]  io.netty.handler.timeout.ReadTimeoutException
2026-08-12T17:21:30.890437539Z [inf]  
2026-08-12T17:21:30.890440309Z [inf]  2026-08-12T17:21:30.866Z  WARN 1 --- [smart-notes-api] [nio-8080-exec-2] o.springframework.ai.retry.RetryUtils    : Retry error. Retry count:1
2026-08-12T17:21:30.890443519Z [inf]  
2026-08-12T17:21:30.890446189Z [inf]  org.springframework.web.client.ResourceAccessException: I/O error on POST request for "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions": null
2026-08-12T17:21:30.890448889Z [inf]  	at org.springframework.web.client.DefaultRestClient$DefaultRequestBodyUriSpec.createResourceAccessException(DefaultRestClient.java:704) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.890451429Z [inf]  	at org.springframework.web.client.DefaultRestClient$DefaultRequestBodyUriSpec.exchangeInternal(DefaultRestClient.java:589) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.890454049Z [inf]  	at org.springframework.web.client.DefaultRestClient$DefaultRequestBodyUriSpec.exchange(DefaultRestClient.java:540) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.890456459Z [inf]  	at org.springframework.web.client.RestClient$RequestHeadersSpec.exchange(RestClient.java:677) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.890458719Z [inf]  	at org.springframework.web.client.DefaultRestClient$DefaultResponseSpec.executeAndExtract(DefaultRestClient.java:821) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.890461479Z [inf]  	at org.springframework.web.client.DefaultRestClient$DefaultResponseSpec.toEntityInternal(DefaultRestClient.java:781) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.891711805Z [inf]  	at org.springframework.web.client.DefaultRestClient$DefaultResponseSpec.toEntity(DefaultRestClient.java:770) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.891720865Z [inf]  	at org.springframework.ai.openai.api.OpenAiApi.chatCompletionEntity(OpenAiApi.java:187) ~[spring-ai-openai-1.0.0.jar!/:1.0.0]
2026-08-12T17:21:30.891725565Z [inf]  	at org.springframework.ai.openai.OpenAiChatModel.lambda$internalCall$1(OpenAiChatModel.java:199) ~[spring-ai-openai-1.0.0.jar!/:1.0.0]
2026-08-12T17:21:30.891728655Z [inf]  	at org.springframework.retry.support.RetryTemplate.doExecute(RetryTemplate.java:357) ~[spring-retry-2.0.12.jar!/:na]
2026-08-12T17:21:30.891733495Z [inf]  	at org.springframework.retry.support.RetryTemplate.execute(RetryTemplate.java:230) ~[spring-retry-2.0.12.jar!/:na]
2026-08-12T17:21:30.891736785Z [inf]  	at org.springframework.ai.openai.OpenAiChatModel.lambda$internalCall$3(OpenAiChatModel.java:199) ~[spring-ai-openai-1.0.0.jar!/:1.0.0]
2026-08-12T17:21:30.891740425Z [inf]  	at io.micrometer.observation.Observation.observe(Observation.java:564) ~[micrometer-observation-1.15.11.jar!/:1.15.11]
2026-08-12T17:21:30.891746095Z [inf]  	at org.springframework.ai.openai.OpenAiChatModel.internalCall(OpenAiChatModel.java:196) ~[spring-ai-openai-1.0.0.jar!/:1.0.0]
2026-08-12T17:21:30.891749115Z [inf]  	at org.springframework.ai.openai.OpenAiChatModel.call(OpenAiChatModel.java:181) ~[spring-ai-openai-1.0.0.jar!/:1.0.0]
2026-08-12T17:21:30.891752565Z [inf]  	at org.springframework.ai.chat.client.advisor.ChatModelCallAdvisor.adviseCall(ChatModelCallAdvisor.java:54) ~[spring-ai-client-chat-1.0.0.jar!/:1.0.0]
2026-08-12T17:21:30.891756635Z [inf]  	at org.springframework.ai.chat.client.advisor.DefaultAroundAdvisorChain.lambda$nextCall$1(DefaultAroundAdvisorChain.java:110) ~[spring-ai-client-chat-1.0.0.jar!/:1.0.0]
2026-08-12T17:21:30.891760214Z [inf]  	at io.micrometer.observation.Observation.observe(Observation.java:564) ~[micrometer-observation-1.15.11.jar!/:1.15.11]
2026-08-12T17:21:30.892790193Z [inf]  	at org.springframework.ai.chat.client.advisor.DefaultAroundAdvisorChain.nextCall(DefaultAroundAdvisorChain.java:110) ~[spring-ai-client-chat-1.0.0.jar!/:1.0.0]
2026-08-12T17:21:30.892793323Z [inf]  	at org.springframework.ai.chat.client.DefaultChatClient$DefaultCallResponseSpec.lambda$doGetObservableChatClientResponse$1(DefaultChatClient.java:469) ~[spring-ai-client-chat-1.0.0.jar!/:1.0.0]
2026-08-12T17:21:30.892795673Z [inf]  	at io.micrometer.observation.Observation.observe(Observation.java:564) ~[micrometer-observation-1.15.11.jar!/:1.15.11]
2026-08-12T17:21:30.892798003Z [inf]  	at org.springframework.ai.chat.client.DefaultChatClient$DefaultCallResponseSpec.doGetObservableChatClientResponse(DefaultChatClient.java:467) ~[spring-ai-client-chat-1.0.0.jar!/:1.0.0]
2026-08-12T17:21:30.892800573Z [inf]  	at org.springframework.ai.chat.client.DefaultChatClient$DefaultCallResponseSpec.doGetObservableChatClientResponse(DefaultChatClient.java:446) ~[spring-ai-client-chat-1.0.0.jar!/:1.0.0]
2026-08-12T17:21:30.892802893Z [inf]  	at org.springframework.ai.chat.client.DefaultChatClient$DefaultCallResponseSpec.content(DefaultChatClient.java:441) ~[spring-ai-client-chat-1.0.0.jar!/:1.0.0]
2026-08-12T17:21:30.892805093Z [inf]  	at com.jeevan.smart_notes_api.service.AiService.lambda$editDocument$16(AiService.java:723) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:21:30.892807123Z [inf]  	at com.jeevan.smart_notes_api.config.AiProviderPool.callWithFailover(AiProviderPool.java:290) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:21:30.892809703Z [inf]  	at com.jeevan.smart_notes_api.service.AiService.editDocument(AiService.java:718) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:21:30.892812233Z [inf]  	at com.jeevan.smart_notes_api.controller.AiController.editDocument(AiController.java:92) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:21:30.892814393Z [inf]  	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(Unknown Source) ~[na:na]
2026-08-12T17:21:30.892817873Z [inf]  	at java.base/java.lang.reflect.Method.invoke(Unknown Source) ~[na:na]
2026-08-12T17:21:30.894098249Z [inf]  	at org.springframework.web.method.support.InvocableHandlerMethod.doInvoke(InvocableHandlerMethod.java:258) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.894102469Z [inf]  	at org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:191) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.894105589Z [inf]  	at org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:118) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.894108259Z [inf]  	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:991) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.894111579Z [inf]  	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:896) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.894114569Z [inf]  	at org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:87) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.894117819Z [inf]  	at org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:1089) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.894120669Z [inf]  	at org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:979) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.894123179Z [inf]  	at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:1014) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.894125469Z [inf]  	at org.springframework.web.servlet.FrameworkServlet.doPost(FrameworkServlet.java:914) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.894127809Z [inf]  	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:590) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:30.895284426Z [inf]  	at org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:885) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.895288766Z [inf]  	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:658) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:30.895291896Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:30.895300346Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:30.895303866Z [inf]  	at org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:51) ~[tomcat-embed-websocket-10.1.54.jar!/:na]
2026-08-12T17:21:30.895307116Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:30.895311256Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:30.895313976Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:110) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.895316556Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:30.895319466Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:30.895322196Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:108) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.895324816Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:108) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.896155337Z [inf]  	at org.springframework.security.web.FilterChainProxy.lambda$doFilterInternal$3(FilterChainProxy.java:231) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:30.896158077Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:370) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:30.896160317Z [inf]  	at org.springframework.security.web.access.intercept.AuthorizationFilter.doFilter(AuthorizationFilter.java:101) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:30.896162977Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:30.896165707Z [inf]  	at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:125) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:30.896168317Z [inf]  	at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:119) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:30.896170707Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:30.896173007Z [inf]  	at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:131) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:30.896175947Z [inf]  	at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:85) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:30.896179377Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:30.896182337Z [inf]  	at org.springframework.security.web.authentication.AnonymousAuthenticationFilter.doFilter(AnonymousAuthenticationFilter.java:100) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:30.897140226Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:30.897143236Z [inf]  	at org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter.doFilter(SecurityContextHolderAwareRequestFilter.java:179) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:30.897145976Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:30.897148986Z [inf]  	at org.springframework.security.web.savedrequest.RequestCacheAwareFilter.doFilter(RequestCacheAwareFilter.java:63) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:30.897151216Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:30.897153486Z [inf]  	at com.jeevan.smart_notes_api.security.jwt.JwtFilter.doFilterInternal(JwtFilter.java:74) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:21:30.897155646Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.897157896Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:30.897160226Z [inf]  	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:107) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:30.897166656Z [inf]  	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:93) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:30.897171345Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:30.898428052Z [inf]  	at org.springframework.web.filter.CorsFilter.doFilterInternal(CorsFilter.java:91) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.898431362Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.898434912Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:30.898439122Z [inf]  	at org.springframework.security.web.header.HeaderWriterFilter.doHeadersAfter(HeaderWriterFilter.java:90) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:30.898442512Z [inf]  	at org.springframework.security.web.header.HeaderWriterFilter.doFilterInternal(HeaderWriterFilter.java:75) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:30.898446512Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.898450042Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:30.898453332Z [inf]  	at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:82) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:30.898456832Z [inf]  	at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:69) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:30.898460892Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:30.898464972Z [inf]  	at org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter.doFilterInternal(WebAsyncManagerIntegrationFilter.java:62) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:30.899590559Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.899596329Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:30.899600459Z [inf]  	at org.springframework.security.web.session.DisableEncodeUrlFilter.doFilterInternal(DisableEncodeUrlFilter.java:42) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:30.899604759Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.899608279Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:30.899612059Z [inf]  	at org.springframework.security.web.FilterChainProxy.doFilterInternal(FilterChainProxy.java:233) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:30.899616309Z [inf]  	at org.springframework.security.web.FilterChainProxy.doFilter(FilterChainProxy.java:191) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:30.899620549Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.899624549Z [inf]  	at org.springframework.web.filter.ServletRequestPathFilter.doFilter(ServletRequestPathFilter.java:52) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.899628139Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.899631849Z [inf]  	at org.springframework.web.filter.CompositeFilter.doFilter(CompositeFilter.java:74) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.899635789Z [inf]  	at org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration$CompositeFilterChainProxy.doFilter(WebSecurityConfiguration.java:319) ~[spring-security-config-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:30.900512270Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.900517400Z [inf]  	at org.springframework.web.servlet.handler.HandlerMappingIntrospector.lambda$createCacheFilter$4(HandlerMappingIntrospector.java:267) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.900521160Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.900524170Z [inf]  	at org.springframework.web.filter.CompositeFilter.doFilter(CompositeFilter.java:74) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.900527570Z [inf]  	at org.springframework.security.config.annotation.web.configuration.WebMvcSecurityConfiguration$CompositeFilterChainProxy.doFilter(WebMvcSecurityConfiguration.java:240) ~[spring-security-config-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:30.900530949Z [inf]  	at org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:362) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.900534009Z [inf]  	at org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:278) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.900537269Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:30.900540699Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:30.900543929Z [inf]  	at org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:100) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.900547389Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.901249471Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:30.901253741Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:30.901256561Z [inf]  	at org.springframework.web.filter.FormContentFilter.doFilterInternal(FormContentFilter.java:93) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.901259511Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.901262161Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:30.901264881Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:30.901267341Z [inf]  	at org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:201) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.901271341Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.901273931Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:30.901276661Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:30.901280141Z [inf]  	at org.springframework.web.filter.ForwardedHeaderFilter.doFilterInternal(ForwardedHeaderFilter.java:173) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.901284151Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.902057023Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:30.902061493Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:30.902065663Z [inf]  	at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:165) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:30.902069603Z [inf]  	at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:88) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:30.902073102Z [inf]  	at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:492) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:30.902076732Z [inf]  	at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:113) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:30.902080212Z [inf]  	at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:83) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:30.902083692Z [inf]  	at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:72) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:30.902087072Z [inf]  	at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:342) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:30.902091302Z [inf]  	at org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:399) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:30.902096062Z [inf]  	at org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:63) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:30.902099632Z [inf]  	at org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:903) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:30.902102532Z [inf]  	at org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1797) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:30.903069962Z [inf]  	at org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:52) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:30.903073712Z [inf]  	at org.apache.tomcat.util.threads.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:973) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:30.903077102Z [inf]  	at org.apache.tomcat.util.threads.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:491) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:30.903081632Z [inf]  	at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:63) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:30.903086132Z [inf]  	at java.base/java.lang.Thread.run(Unknown Source) ~[na:na]
2026-08-12T17:21:30.903089742Z [inf]  Caused by: java.io.IOException
2026-08-12T17:21:30.903093712Z [inf]  	at org.springframework.http.client.ReactorClientHttpRequest.convertException(ReactorClientHttpRequest.java:181) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.903097392Z [inf]  	at org.springframework.http.client.ReactorClientHttpRequest.executeInternal(ReactorClientHttpRequest.java:149) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.903100501Z [inf]  	at org.springframework.http.client.AbstractStreamingClientHttpRequest.executeInternal(AbstractStreamingClientHttpRequest.java:88) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.903104461Z [inf]  	at org.springframework.http.client.AbstractClientHttpRequest.execute(AbstractClientHttpRequest.java:81) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.903108021Z [inf]  	at org.springframework.web.client.DefaultRestClient$DefaultRequestBodyUriSpec.exchangeInternal(DefaultRestClient.java:583) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:30.903111911Z [inf]  	... 137 common frames omitted
2026-08-12T17:21:30.903114931Z [inf]  Caused by: io.netty.handler.timeout.ReadTimeoutException
2026-08-12T17:21:30.903118311Z [inf]  
2026-08-12T17:21:30.903666265Z [inf]  2026-08-12T17:21:30.868Z ERROR 1 --- [smart-notes-api] [nio-8080-exec-2] c.j.s.config.AiProviderPool              : ❌ Non-rate-limit error on GEMINI [AQ.A****AuFw]: I/O error on POST request for "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions": null
2026-08-12T17:21:31.114804057Z [inf]    "error": {
2026-08-12T17:21:31.114815957Z [inf]      "code": 429,
2026-08-12T17:21:31.114818127Z [inf]  2026-08-12T17:21:31.111Z  WARN 1 --- [smart-notes-api] [nio-8080-exec-2] o.springframework.ai.retry.RetryUtils    : Retry error. Retry count:1
2026-08-12T17:21:31.114824027Z [inf]      "message": "You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limits. To monitor your current usage, head to: https://ai.dev/rate-limit. \n* Quota exceeded for metric: generativelanguage.googleapis.com/generate_content_free_tier_requests, limit: 20, model: gemini-3.6-flash\nPlease retry in 28.912939087s.",
2026-08-12T17:21:31.114824877Z [inf]        {
2026-08-12T17:21:31.114826447Z [inf]  
2026-08-12T17:21:31.114829487Z [inf]      "status": "RESOURCE_EXHAUSTED",
2026-08-12T17:21:31.114831647Z [inf]  org.springframework.ai.retry.NonTransientAiException: 429 - [{
2026-08-12T17:21:31.114833877Z [inf]      "details": [
2026-08-12T17:21:31.114838156Z [inf]        {
2026-08-12T17:21:31.114842126Z [inf]          "@type": "type.googleapis.com/google.rpc.Help",
2026-08-12T17:21:31.114860636Z [inf]          "links": [
2026-08-12T17:21:31.114871336Z [inf]            {
2026-08-12T17:21:31.114876996Z [inf]              "description": "Learn more about Gemini API quotas",
2026-08-12T17:21:31.114881766Z [inf]              "url": "https://ai.google.dev/gemini-api/docs/rate-limits"
2026-08-12T17:21:31.114886066Z [inf]            }
2026-08-12T17:21:31.114891196Z [inf]          ]
2026-08-12T17:21:31.114897596Z [inf]          "@type": "type.googleapis.com/google.rpc.QuotaFailure",
2026-08-12T17:21:31.114899096Z [inf]        },
2026-08-12T17:21:31.114904326Z [inf]          "violations": [
2026-08-12T17:21:31.114909176Z [inf]            {
2026-08-12T17:21:31.114913066Z [inf]              "quotaMetric": "generativelanguage.googleapis.com/generate_content_free_tier_requests",
2026-08-12T17:21:31.116096333Z [inf]              "quotaId": "GenerateRequestsPerDayPerProjectPerModel-FreeTier",
2026-08-12T17:21:31.116106583Z [inf]              "quotaDimensions": {
2026-08-12T17:21:31.116112453Z [inf]                "model": "gemini-3.6-flash",
2026-08-12T17:21:31.116120553Z [inf]                "location": "global"
2026-08-12T17:21:31.116127372Z [inf]              },
2026-08-12T17:21:31.116133532Z [inf]              "quotaValue": "20"
2026-08-12T17:21:31.116138882Z [inf]            }
2026-08-12T17:21:31.116144222Z [inf]          ]
2026-08-12T17:21:31.116149262Z [inf]        },
2026-08-12T17:21:31.116153632Z [inf]        {
2026-08-12T17:21:31.116158682Z [inf]          "@type": "type.googleapis.com/google.rpc.RetryInfo",
2026-08-12T17:21:31.116163192Z [inf]          "retryDelay": "28s"
2026-08-12T17:21:31.116168632Z [inf]        }
2026-08-12T17:21:31.116178332Z [inf]      ]
2026-08-12T17:21:31.116183382Z [inf]    }
2026-08-12T17:21:31.116188702Z [inf]  }
2026-08-12T17:21:31.116194202Z [inf]  ]
2026-08-12T17:21:31.116199572Z [inf]  	at org.springframework.ai.retry.RetryUtils$1.handleError(RetryUtils.java:63) ~[spring-ai-retry-1.0.0.jar!/:1.0.0]
2026-08-12T17:21:31.116212251Z [inf]  	at org.springframework.web.client.ResponseErrorHandler.handleError(ResponseErrorHandler.java:58) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.116217421Z [inf]  	at org.springframework.web.client.StatusHandler.lambda$fromErrorHandler$1(StatusHandler.java:71) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.116222391Z [inf]  	at org.springframework.web.client.StatusHandler.handle(StatusHandler.java:146) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.116228501Z [inf]  	at org.springframework.web.client.DefaultRestClient$DefaultResponseSpec.applyStatusHandlers(DefaultRestClient.java:838) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.116233491Z [inf]  	at org.springframework.web.client.DefaultRestClient$DefaultResponseSpec.lambda$readBody$4(DefaultRestClient.java:827) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.117432058Z [inf]  	at org.springframework.web.client.DefaultRestClient.readWithMessageConverters(DefaultRestClient.java:216) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.117435028Z [inf]  	at org.springframework.web.client.DefaultRestClient$DefaultResponseSpec.readBody(DefaultRestClient.java:826) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.117437418Z [inf]  	at org.springframework.web.client.DefaultRestClient$DefaultResponseSpec.lambda$toEntityInternal$2(DefaultRestClient.java:782) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.117442488Z [inf]  	at org.springframework.web.client.DefaultRestClient$DefaultRequestBodyUriSpec.exchangeInternal(DefaultRestClient.java:586) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.117445288Z [inf]  	at org.springframework.web.client.DefaultRestClient$DefaultRequestBodyUriSpec.exchange(DefaultRestClient.java:540) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.117448948Z [inf]  	at org.springframework.web.client.RestClient$RequestHeadersSpec.exchange(RestClient.java:677) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.117452108Z [inf]  	at org.springframework.web.client.DefaultRestClient$DefaultResponseSpec.executeAndExtract(DefaultRestClient.java:821) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.117454548Z [inf]  	at org.springframework.web.client.DefaultRestClient$DefaultResponseSpec.toEntityInternal(DefaultRestClient.java:781) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.117457158Z [inf]  	at org.springframework.web.client.DefaultRestClient$DefaultResponseSpec.toEntity(DefaultRestClient.java:770) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.117460018Z [inf]  	at org.springframework.ai.openai.api.OpenAiApi.chatCompletionEntity(OpenAiApi.java:187) ~[spring-ai-openai-1.0.0.jar!/:1.0.0]
2026-08-12T17:21:31.117462778Z [inf]  	at org.springframework.ai.openai.OpenAiChatModel.lambda$internalCall$1(OpenAiChatModel.java:199) ~[spring-ai-openai-1.0.0.jar!/:1.0.0]
2026-08-12T17:21:31.118234119Z [inf]  	at org.springframework.retry.support.RetryTemplate.doExecute(RetryTemplate.java:357) ~[spring-retry-2.0.12.jar!/:na]
2026-08-12T17:21:31.118238609Z [inf]  	at org.springframework.retry.support.RetryTemplate.execute(RetryTemplate.java:230) ~[spring-retry-2.0.12.jar!/:na]
2026-08-12T17:21:31.118242429Z [inf]  	at org.springframework.ai.openai.OpenAiChatModel.lambda$internalCall$3(OpenAiChatModel.java:199) ~[spring-ai-openai-1.0.0.jar!/:1.0.0]
2026-08-12T17:21:31.118247809Z [inf]  	at io.micrometer.observation.Observation.observe(Observation.java:564) ~[micrometer-observation-1.15.11.jar!/:1.15.11]
2026-08-12T17:21:31.118251169Z [inf]  	at org.springframework.ai.openai.OpenAiChatModel.internalCall(OpenAiChatModel.java:196) ~[spring-ai-openai-1.0.0.jar!/:1.0.0]
2026-08-12T17:21:31.118254429Z [inf]  	at org.springframework.ai.openai.OpenAiChatModel.call(OpenAiChatModel.java:181) ~[spring-ai-openai-1.0.0.jar!/:1.0.0]
2026-08-12T17:21:31.118258209Z [inf]  	at org.springframework.ai.chat.client.advisor.ChatModelCallAdvisor.adviseCall(ChatModelCallAdvisor.java:54) ~[spring-ai-client-chat-1.0.0.jar!/:1.0.0]
2026-08-12T17:21:31.118261479Z [inf]  	at org.springframework.ai.chat.client.advisor.DefaultAroundAdvisorChain.lambda$nextCall$1(DefaultAroundAdvisorChain.java:110) ~[spring-ai-client-chat-1.0.0.jar!/:1.0.0]
2026-08-12T17:21:31.118265119Z [inf]  	at io.micrometer.observation.Observation.observe(Observation.java:564) ~[micrometer-observation-1.15.11.jar!/:1.15.11]
2026-08-12T17:21:31.118268718Z [inf]  	at org.springframework.ai.chat.client.advisor.DefaultAroundAdvisorChain.nextCall(DefaultAroundAdvisorChain.java:110) ~[spring-ai-client-chat-1.0.0.jar!/:1.0.0]
2026-08-12T17:21:31.118272088Z [inf]  	at org.springframework.ai.chat.client.DefaultChatClient$DefaultCallResponseSpec.lambda$doGetObservableChatClientResponse$1(DefaultChatClient.java:469) ~[spring-ai-client-chat-1.0.0.jar!/:1.0.0]
2026-08-12T17:21:31.118275508Z [inf]  	at io.micrometer.observation.Observation.observe(Observation.java:564) ~[micrometer-observation-1.15.11.jar!/:1.15.11]
2026-08-12T17:21:31.119497255Z [inf]  	at org.springframework.ai.chat.client.DefaultChatClient$DefaultCallResponseSpec.doGetObservableChatClientResponse(DefaultChatClient.java:467) ~[spring-ai-client-chat-1.0.0.jar!/:1.0.0]
2026-08-12T17:21:31.119501235Z [inf]  	at org.springframework.ai.chat.client.DefaultChatClient$DefaultCallResponseSpec.doGetObservableChatClientResponse(DefaultChatClient.java:446) ~[spring-ai-client-chat-1.0.0.jar!/:1.0.0]
2026-08-12T17:21:31.119503695Z [inf]  	at org.springframework.ai.chat.client.DefaultChatClient$DefaultCallResponseSpec.content(DefaultChatClient.java:441) ~[spring-ai-client-chat-1.0.0.jar!/:1.0.0]
2026-08-12T17:21:31.119506705Z [inf]  	at com.jeevan.smart_notes_api.service.AiService.lambda$editDocument$16(AiService.java:723) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:21:31.119509385Z [inf]  	at com.jeevan.smart_notes_api.config.AiProviderPool.callWithFailover(AiProviderPool.java:290) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:21:31.119512805Z [inf]  	at com.jeevan.smart_notes_api.service.AiService.editDocument(AiService.java:718) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:21:31.119515325Z [inf]  	at com.jeevan.smart_notes_api.controller.AiController.editDocument(AiController.java:92) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:21:31.119519205Z [inf]  	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(Unknown Source) ~[na:na]
2026-08-12T17:21:31.119521615Z [inf]  	at java.base/java.lang.reflect.Method.invoke(Unknown Source) ~[na:na]
2026-08-12T17:21:31.119523885Z [inf]  	at org.springframework.web.method.support.InvocableHandlerMethod.doInvoke(InvocableHandlerMethod.java:258) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.119526925Z [inf]  	at org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:191) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.119529685Z [inf]  	at org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:118) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.120876910Z [inf]  	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:991) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.120882850Z [inf]  	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:896) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.120887340Z [inf]  	at org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:87) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.120891430Z [inf]  	at org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:1089) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.120895400Z [inf]  	at org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:979) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.120899680Z [inf]  	at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:1014) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.120904520Z [inf]  	at org.springframework.web.servlet.FrameworkServlet.doPost(FrameworkServlet.java:914) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.120908210Z [inf]  	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:590) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:31.120911590Z [inf]  	at org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:885) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.120915250Z [inf]  	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:658) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:31.120918330Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:31.120921929Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:31.121556563Z [inf]  	at org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:51) ~[tomcat-embed-websocket-10.1.54.jar!/:na]
2026-08-12T17:21:31.121560853Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:31.121564303Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:31.121567573Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:110) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.121571433Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:31.121574733Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:31.121578173Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:108) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.121585973Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:108) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.121589243Z [inf]  	at org.springframework.security.web.FilterChainProxy.lambda$doFilterInternal$3(FilterChainProxy.java:231) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:31.121592793Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:370) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:31.121596183Z [inf]  	at org.springframework.security.web.access.intercept.AuthorizationFilter.doFilter(AuthorizationFilter.java:101) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:31.121599823Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:31.123109966Z [inf]  	at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:125) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:31.123114546Z [inf]  	at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:119) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:31.123120016Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:31.123124776Z [inf]  	at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:131) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:31.123129036Z [inf]  	at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:85) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:31.123132926Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:31.123136466Z [inf]  	at org.springframework.security.web.authentication.AnonymousAuthenticationFilter.doFilter(AnonymousAuthenticationFilter.java:100) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:31.123140126Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:31.123143776Z [inf]  	at org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter.doFilter(SecurityContextHolderAwareRequestFilter.java:179) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:31.123147325Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:31.123152165Z [inf]  	at org.springframework.security.web.savedrequest.RequestCacheAwareFilter.doFilter(RequestCacheAwareFilter.java:63) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:31.124025696Z [inf]  	at org.springframework.security.web.header.HeaderWriterFilter.doFilterInternal(HeaderWriterFilter.java:75) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:31.124035746Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:31.124041346Z [inf]  	at com.jeevan.smart_notes_api.security.jwt.JwtFilter.doFilterInternal(JwtFilter.java:74) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:21:31.124044766Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.124047746Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:31.124051466Z [inf]  	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:107) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:31.124054546Z [inf]  	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:93) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:31.124057546Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:31.124060646Z [inf]  	at org.springframework.web.filter.CorsFilter.doFilterInternal(CorsFilter.java:91) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.124063966Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.124067406Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:31.124070986Z [inf]  	at org.springframework.security.web.header.HeaderWriterFilter.doHeadersAfter(HeaderWriterFilter.java:90) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:31.125667158Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.125672858Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:31.125677078Z [inf]  	at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:82) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:31.125680808Z [inf]  	at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:69) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:31.125685038Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:31.125688378Z [inf]  	at org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter.doFilterInternal(WebAsyncManagerIntegrationFilter.java:62) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:31.125691498Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.125695248Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:31.125698938Z [inf]  	at org.springframework.security.web.session.DisableEncodeUrlFilter.doFilterInternal(DisableEncodeUrlFilter.java:42) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:31.125702168Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.125705468Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:31.126695007Z [inf]  	at org.springframework.security.web.FilterChainProxy.doFilterInternal(FilterChainProxy.java:233) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:31.126698317Z [inf]  	at org.springframework.security.web.FilterChainProxy.doFilter(FilterChainProxy.java:191) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:31.126701877Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.126705017Z [inf]  	at org.springframework.web.filter.ServletRequestPathFilter.doFilter(ServletRequestPathFilter.java:52) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.126709677Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.126713077Z [inf]  	at org.springframework.web.filter.CompositeFilter.doFilter(CompositeFilter.java:74) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.126716577Z [inf]  	at org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration$CompositeFilterChainProxy.doFilter(WebSecurityConfiguration.java:319) ~[spring-security-config-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:31.126720527Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.126723677Z [inf]  	at org.springframework.web.servlet.handler.HandlerMappingIntrospector.lambda$createCacheFilter$4(HandlerMappingIntrospector.java:267) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.126726717Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.126729677Z [inf]  	at org.springframework.web.filter.CompositeFilter.doFilter(CompositeFilter.java:74) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.127653357Z [inf]  	at org.springframework.security.config.annotation.web.configuration.WebMvcSecurityConfiguration$CompositeFilterChainProxy.doFilter(WebMvcSecurityConfiguration.java:240) ~[spring-security-config-6.5.10.jar!/:6.5.10]
2026-08-12T17:21:31.127660797Z [inf]  	at org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:362) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.127666307Z [inf]  	at org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:278) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.127671657Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:31.127676657Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:31.127682466Z [inf]  	at org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:100) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.127689086Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.127694206Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:31.127700196Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:31.127706056Z [inf]  	at org.springframework.web.filter.FormContentFilter.doFilterInternal(FormContentFilter.java:93) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.127711616Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.127716766Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:31.128518367Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:31.128522477Z [inf]  	at org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:201) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.128525647Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.128529277Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:31.128532497Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:31.128536957Z [inf]  	at org.springframework.web.filter.ForwardedHeaderFilter.doFilterInternal(ForwardedHeaderFilter.java:173) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.128540136Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:21:31.128543036Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:31.128546366Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:31.128549856Z [inf]  	at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:165) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:31.128554056Z [inf]  	at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:88) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:31.128557316Z [inf]  	at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:492) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:31.129208710Z [inf]  	at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:113) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:31.129213850Z [inf]  	at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:83) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:31.129217860Z [inf]  	at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:72) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:31.129222179Z [inf]  	at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:342) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:31.129225609Z [inf]  	at org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:399) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:31.129229399Z [inf]  	at org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:63) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:31.129232719Z [inf]  	at org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:903) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:31.129235879Z [inf]  	at org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1797) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:31.129239259Z [inf]  	at org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:52) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:31.129242669Z [inf]  	at org.apache.tomcat.util.threads.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:973) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:31.129246269Z [inf]  	at org.apache.tomcat.util.threads.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:491) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:31.129249809Z [inf]  	at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:63) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:21:31.129252999Z [inf]  	at java.base/java.lang.Thread.run(Unknown Source) ~[na:na]
2026-08-12T17:21:31.130473786Z [inf]  
2026-08-12T17:21:31.130476806Z [inf]  2026-08-12T17:21:31.113Z  WARN 1 --- [smart-notes-api] [nio-8080-exec-2] c.j.s.config.AiProviderPool              : ⚠️ Rate-limited: GEMINI [AQ.A****0wGg] — cooldown 65s
2026-08-12T17:21:31.130479446Z [inf]  2026-08-12T17:21:31.113Z  WARN 1 --- [smart-notes-api] [nio-8080-exec-2] c.j.s.config.AiProviderPool              : ⚠️ Rate limit hit on GEMINI [AQ.A****0wGg], rotating to next provider...
2026-08-12T17:21:37.418952610Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:21:37.598476727Z [inf]  Hibernate: select cs1_0.id,cs1_0.created_at,cs1_0.pinned,cs1_0.title,cs1_0.updated_at,cs1_0.user_id from chat_sessions cs1_0 left join users u1_0 on u1_0.id=cs1_0.user_id where cs1_0.id=? and u1_0.email=?
2026-08-12T17:21:37.857510478Z [inf]  Hibernate: select cm1_0.id,cm1_0.attachment_names,cm1_0.content,cm1_0.created_at,cm1_0.role,cm1_0.session_id from chat_messages cm1_0 left join chat_sessions s1_0 on s1_0.id=cm1_0.session_id where s1_0.id=? order by cm1_0.created_at
2026-08-12T17:21:38.153965832Z [inf]  Hibernate: update chat_messages set attachment_names=?,content=?,role=?,session_id=? where id=?
2026-08-12T17:21:44.798435791Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:21:45.295796882Z [inf]  Hibernate: select cs1_0.id,cs1_0.created_at,cs1_0.pinned,cs1_0.title,cs1_0.updated_at,cs1_0.user_id from chat_sessions cs1_0 left join users u1_0 on u1_0.id=cs1_0.user_id where cs1_0.id=? and u1_0.email=?
2026-08-12T17:21:45.367789799Z [inf]  Hibernate: select cm1_0.id,cm1_0.attachment_names,cm1_0.content,cm1_0.created_at,cm1_0.role,cm1_0.session_id from chat_messages cm1_0 left join chat_sessions s1_0 on s1_0.id=cm1_0.session_id where s1_0.id=? order by cm1_0.created_at
2026-08-12T17:21:45.724662008Z [inf]  Hibernate: update chat_messages set attachment_names=?,content=?,role=?,session_id=? where id=?
2026-08-12T17:22:05.909157363Z [inf]  2026-08-12T17:21:55.999Z  INFO 1 --- [smart-notes-api] [MessageBroker-1] o.s.w.s.c.WebSocketMessageBrokerStats    : WebSocketSession[0 current WS(0)-HttpStream(0)-HttpPoll(0), 0 total, 0 closed abnormally (0 connect failure, 0 send limit, 0 transport error)], stompSubProtocol[processed CONNECT(0)-CONNECTED(0)-DISCONNECT(0)], stompBrokerRelay[null], inboundChannel[pool size = 0, active threads = 0, queued tasks = 0, completed tasks = 0], outboundChannel[pool size = 0, active threads = 0, queued tasks = 0, completed tasks = 0], sockJsScheduler[pool size = 2, active threads = 1, queued tasks = 1, completed tasks = 0]
2026-08-12T17:23:26.296746609Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:23:26.296751879Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:23:26.296755149Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:23:26.296757899Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:23:26.296779159Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:23:26.296782609Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:23:26.296785649Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:23:26.297058325Z [inf]  Hibernate: select cs1_0.id,cs1_0.created_at,cs1_0.pinned,cs1_0.title,cs1_0.updated_at,cs1_0.user_id from chat_sessions cs1_0 left join users u1_0 on u1_0.id=cs1_0.user_id where u1_0.email=? order by cs1_0.updated_at desc
2026-08-12T17:23:26.297061045Z [inf]  Hibernate: select n1_0.id,n1_0.content,n1_0.created_at,n1_0.title,n1_0.user_id from notes n1_0 left join users u1_0 on u1_0.id=n1_0.user_id where u1_0.email=?
2026-08-12T17:23:26.297063665Z [inf]  Hibernate: select s1_0.id,s1_0.active,s1_0.billing_cycle,s1_0.cancel_at_cycle_end,s1_0.created_at,s1_0.current_period_end,s1_0.current_period_start,s1_0.end_date,s1_0.plan,s1_0.razorpay_plan_id,s1_0.razorpay_subscription_id,s1_0.start_date,s1_0.status,s1_0.updated_at,s1_0.user_id from subscriptions s1_0 left join users u1_0 on u1_0.id=s1_0.user_id where u1_0.email=?
2026-08-12T17:23:26.297066085Z [inf]  Hibernate: select s1_0.id,s1_0.active,s1_0.billing_cycle,s1_0.cancel_at_cycle_end,s1_0.created_at,s1_0.current_period_end,s1_0.current_period_start,s1_0.end_date,s1_0.plan,s1_0.razorpay_plan_id,s1_0.razorpay_subscription_id,s1_0.start_date,s1_0.status,s1_0.updated_at,s1_0.user_id from subscriptions s1_0 left join users u1_0 on u1_0.id=s1_0.user_id where u1_0.email=?
2026-08-12T17:23:26.297068465Z [inf]  Hibernate: select n1_0.id,n1_0.created_at,n1_0.description,n1_0.is_read,n1_0.title,n1_0.type,n1_0.user_id from notifications n1_0 where n1_0.user_id=? order by n1_0.created_at desc
2026-08-12T17:23:26.297071375Z [inf]  Hibernate: select ut1_0.id,ut1_0.ai_requests,ut1_0.images_attached,ut1_0.images_generated,ut1_0.pdfs_attached,ut1_0.pdfs_generated,ut1_0.usage_date,ut1_0.user_id from usage_tracker ut1_0 left join users u1_0 on u1_0.id=ut1_0.user_id where u1_0.email=? and ut1_0.usage_date=?
2026-08-12T17:23:26.297074095Z [inf]  Hibernate: select s1_0.id,s1_0.active,s1_0.billing_cycle,s1_0.cancel_at_cycle_end,s1_0.created_at,s1_0.current_period_end,s1_0.current_period_start,s1_0.end_date,s1_0.plan,s1_0.razorpay_plan_id,s1_0.razorpay_subscription_id,s1_0.start_date,s1_0.status,s1_0.updated_at,s1_0.user_id from subscriptions s1_0 left join users u1_0 on u1_0.id=s1_0.user_id where u1_0.email=?
2026-08-12T17:23:26.297753408Z [inf]  Hibernate: select ut1_0.id,ut1_0.ai_requests,ut1_0.images_attached,ut1_0.images_generated,ut1_0.pdfs_attached,ut1_0.pdfs_generated,ut1_0.usage_date,ut1_0.user_id from usage_tracker ut1_0 left join users u1_0 on u1_0.id=ut1_0.user_id where u1_0.email=? and ut1_0.usage_date=?
2026-08-12T17:23:26.297756278Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:23:26.297758718Z [inf]  Hibernate: select cs1_0.id,cs1_0.created_at,cs1_0.pinned,cs1_0.title,cs1_0.updated_at,cs1_0.user_id from chat_sessions cs1_0 left join users u1_0 on u1_0.id=cs1_0.user_id where cs1_0.id=? and u1_0.email=?
2026-08-12T17:23:26.297761228Z [inf]  Hibernate: select cs1_0.id,cs1_0.created_at,cs1_0.pinned,cs1_0.title,cs1_0.updated_at,cs1_0.user_id from chat_sessions cs1_0 left join users u1_0 on u1_0.id=cs1_0.user_id where cs1_0.id=? and u1_0.email=?
2026-08-12T17:23:26.297763538Z [inf]  Hibernate: select cm1_0.id,cm1_0.attachment_names,cm1_0.content,cm1_0.created_at,cm1_0.role,cm1_0.session_id from chat_messages cm1_0 left join chat_sessions s1_0 on s1_0.id=cm1_0.session_id where s1_0.id=? order by cm1_0.created_at
2026-08-12T17:23:46.432567232Z [inf]  Hibernate: select s1_0.id,s1_0.active,s1_0.billing_cycle,s1_0.cancel_at_cycle_end,s1_0.created_at,s1_0.current_period_end,s1_0.current_period_start,s1_0.end_date,s1_0.plan,s1_0.razorpay_plan_id,s1_0.razorpay_subscription_id,s1_0.start_date,s1_0.status,s1_0.updated_at,s1_0.user_id from subscriptions s1_0 left join users u1_0 on u1_0.id=s1_0.user_id where u1_0.email=?
2026-08-12T17:23:46.432576752Z [inf]  Hibernate: select ut1_0.id,ut1_0.ai_requests,ut1_0.images_attached,ut1_0.images_generated,ut1_0.pdfs_attached,ut1_0.pdfs_generated,ut1_0.usage_date,ut1_0.user_id from usage_tracker ut1_0 left join users u1_0 on u1_0.id=ut1_0.user_id where u1_0.email=? and ut1_0.usage_date=?
2026-08-12T17:23:46.432577742Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:23:46.432582112Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:23:46.432582762Z [inf]  Hibernate: select s1_0.id,s1_0.active,s1_0.billing_cycle,s1_0.cancel_at_cycle_end,s1_0.created_at,s1_0.current_period_end,s1_0.current_period_start,s1_0.end_date,s1_0.plan,s1_0.razorpay_plan_id,s1_0.razorpay_subscription_id,s1_0.start_date,s1_0.status,s1_0.updated_at,s1_0.user_id from subscriptions s1_0 left join users u1_0 on u1_0.id=s1_0.user_id where u1_0.email=?
2026-08-12T17:23:46.432588842Z [inf]  Hibernate: select u1_0.id,u1_0.auth_provider,u1_0.created_at,u1_0.email,u1_0.email_verified,u1_0.password,u1_0.profile_image_url,u1_0.razorpay_customer_id,u1_0.role,u1_0.subscription_plan,u1_0.updated_at,u1_0.username from users u1_0 where u1_0.email=?
2026-08-12T17:23:47.270814819Z [inf]  Hibernate: update users set auth_provider=?,email=?,email_verified=?,password=?,profile_image_url=?,razorpay_customer_id=?,role=?,subscription_plan=?,updated_at=?,username=? where id=?
2026-08-12T17:23:47.448100366Z [inf]  Hibernate: select s1_0.id,s1_0.active,s1_0.billing_cycle,s1_0.cancel_at_cycle_end,s1_0.created_at,s1_0.current_period_end,s1_0.current_period_start,s1_0.end_date,s1_0.plan,s1_0.razorpay_plan_id,s1_0.razorpay_subscription_id,s1_0.start_date,s1_0.status,s1_0.updated_at,s1_0.user_id from subscriptions s1_0 left join users u1_0 on u1_0.id=s1_0.user_id where u1_0.email=?
2026-08-12T17:23:47.792910956Z [inf]  2026-08-12T17:23:47.787Z ERROR 1 --- [smart-notes-api] [nio-8080-exec-3] c.j.s.service.RazorpayService            : Failed to create Razorpay subscription for customer cust_TOwJNxdiFiGxCl and plan plan_TOuvcE0VB6FIrq
2026-08-12T17:23:47.792915286Z [inf]  
2026-08-12T17:23:47.792923306Z [inf]  com.razorpay.RazorpayException: BAD_REQUEST_ERROR:The ID provided is invalid or could not be found.
2026-08-12T17:23:47.792928246Z [inf]  	at com.razorpay.ApiClient.throwException(ApiClient.java:228) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:23:47.792932366Z [inf]  	at com.razorpay.ApiClient.processResponse(ApiClient.java:180) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:23:47.792938186Z [inf]  	at com.razorpay.ApiClient.post(ApiClient.java:55) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:23:47.792942446Z [inf]  	at com.razorpay.SubscriptionClient.post(SubscriptionClient.java:7) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:23:47.792946736Z [inf]  	at com.razorpay.ApiClient.post(ApiClient.java:50) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:23:47.792950366Z [inf]  	at com.razorpay.SubscriptionClient.post(SubscriptionClient.java:7) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:23:47.792956226Z [inf]  	at com.razorpay.SubscriptionClient.create(SubscriptionClient.java:14) ~[razorpay-java-1.4.6.jar!/:na]
2026-08-12T17:23:47.792960396Z [inf]  	at com.jeevan.smart_notes_api.service.RazorpayService.createSubscription(RazorpayService.java:71) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:23:47.792964016Z [inf]  	at com.jeevan.smart_notes_api.service.SubscriptionService.createCheckoutSession(SubscriptionService.java:178) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:23:47.792967736Z [inf]  	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(Unknown Source) ~[na:na]
2026-08-12T17:23:47.792971646Z [inf]  	at java.base/java.lang.reflect.Method.invoke(Unknown Source) ~[na:na]
2026-08-12T17:23:47.792977127Z [inf]  	at org.springframework.aop.support.AopUtils.invokeJoinpointUsingReflection(AopUtils.java:360) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.793272083Z [inf]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.invokeJoinpoint(ReflectiveMethodInvocation.java:196) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.793277153Z [inf]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:163) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.793280443Z [inf]  	at org.springframework.transaction.interceptor.TransactionAspectSupport.invokeWithinTransaction(TransactionAspectSupport.java:380) ~[spring-tx-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.793284403Z [inf]  	at org.springframework.transaction.interceptor.TransactionInterceptor.invoke(TransactionInterceptor.java:119) ~[spring-tx-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.793287113Z [inf]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:184) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.793290263Z [inf]  	at org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:728) ~[spring-aop-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.793292723Z [inf]  	at com.jeevan.smart_notes_api.service.SubscriptionService$$SpringCGLIB$$0.createCheckoutSession(<generated>) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:23:47.793295073Z [inf]  	at com.jeevan.smart_notes_api.controller.SubscriptionController.createCheckoutSession(SubscriptionController.java:50) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:23:47.793297453Z [inf]  	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(Unknown Source) ~[na:na]
2026-08-12T17:23:47.793300223Z [inf]  	at java.base/java.lang.reflect.Method.invoke(Unknown Source) ~[na:na]
2026-08-12T17:23:47.793302703Z [inf]  	at org.springframework.web.method.support.InvocableHandlerMethod.doInvoke(InvocableHandlerMethod.java:258) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.793305033Z [inf]  	at org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:191) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.793663279Z [inf]  	at org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:118) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.793667359Z [inf]  	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:991) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.793670889Z [inf]  	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:896) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.793674838Z [inf]  	at org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:87) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.793678798Z [inf]  	at org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:1089) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.793682308Z [inf]  	at org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:979) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.793685418Z [inf]  	at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:1014) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.793688328Z [inf]  	at org.springframework.web.servlet.FrameworkServlet.doPost(FrameworkServlet.java:914) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.793691588Z [inf]  	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:590) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:23:47.793694658Z [inf]  	at org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:885) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.793698228Z [inf]  	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:658) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:23:47.793701678Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:23:47.794335462Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:23:47.794338432Z [inf]  	at org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:51) ~[tomcat-embed-websocket-10.1.54.jar!/:na]
2026-08-12T17:23:47.794342692Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:23:47.794346582Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:23:47.794350732Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:110) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.794353592Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:23:47.794356432Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:23:47.794359452Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:108) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.794362502Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:108) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.794365061Z [inf]  	at org.springframework.security.web.FilterChainProxy.lambda$doFilterInternal$3(FilterChainProxy.java:231) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:23:47.794367411Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:370) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:23:47.794370041Z [inf]  	at org.springframework.security.web.access.intercept.AuthorizationFilter.doFilter(AuthorizationFilter.java:101) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:23:47.794718797Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:23:47.794721207Z [inf]  	at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:125) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:23:47.794723637Z [inf]  	at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:119) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:23:47.794726687Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:23:47.794730077Z [inf]  	at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:131) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:23:47.794733017Z [inf]  	at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:85) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:23:47.794735527Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:23:47.794737867Z [inf]  	at org.springframework.security.web.authentication.AnonymousAuthenticationFilter.doFilter(AnonymousAuthenticationFilter.java:100) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:23:47.794740377Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:23:47.794742657Z [inf]  	at org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter.doFilter(SecurityContextHolderAwareRequestFilter.java:179) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:23:47.795324320Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:23:47.795327860Z [inf]  	at org.springframework.security.web.savedrequest.RequestCacheAwareFilter.doFilter(RequestCacheAwareFilter.java:63) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:23:47.795331610Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:23:47.795335050Z [inf]  	at com.jeevan.smart_notes_api.security.jwt.JwtFilter.doFilterInternal(JwtFilter.java:74) ~[!/:0.0.1-SNAPSHOT]
2026-08-12T17:23:47.795338530Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.795341870Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:23:47.795345000Z [inf]  	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:107) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:23:47.795348780Z [inf]  	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:93) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:23:47.795352780Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:23:47.795355990Z [inf]  	at org.springframework.web.filter.CorsFilter.doFilterInternal(CorsFilter.java:91) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.795359560Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.795362530Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:23:47.795878555Z [inf]  	at org.springframework.security.web.header.HeaderWriterFilter.doHeadersAfter(HeaderWriterFilter.java:90) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:23:47.795882495Z [inf]  	at org.springframework.security.web.header.HeaderWriterFilter.doFilterInternal(HeaderWriterFilter.java:75) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:23:47.795885565Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.795888625Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:23:47.795891985Z [inf]  	at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:82) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:23:47.795895405Z [inf]  	at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:69) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:23:47.795898695Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:23:47.795902015Z [inf]  	at org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter.doFilterInternal(WebAsyncManagerIntegrationFilter.java:62) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:23:47.795905315Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.795908635Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:23:47.795911835Z [inf]  	at org.springframework.security.web.session.DisableEncodeUrlFilter.doFilterInternal(DisableEncodeUrlFilter.java:42) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:23:47.796422969Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.796429729Z [inf]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:23:47.796434599Z [inf]  	at org.springframework.security.web.FilterChainProxy.doFilterInternal(FilterChainProxy.java:233) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:23:47.796438509Z [inf]  	at org.springframework.security.web.FilterChainProxy.doFilter(FilterChainProxy.java:191) ~[spring-security-web-6.5.10.jar!/:6.5.10]
2026-08-12T17:23:47.796442908Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.796447338Z [inf]  	at org.springframework.web.filter.ServletRequestPathFilter.doFilter(ServletRequestPathFilter.java:52) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.796451248Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.796456598Z [inf]  	at org.springframework.web.filter.CompositeFilter.doFilter(CompositeFilter.java:74) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.796460618Z [inf]  	at org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration$CompositeFilterChainProxy.doFilter(WebSecurityConfiguration.java:319) ~[spring-security-config-6.5.10.jar!/:6.5.10]
2026-08-12T17:23:47.796464548Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.796468898Z [inf]  	at org.springframework.web.servlet.handler.HandlerMappingIntrospector.lambda$createCacheFilter$4(HandlerMappingIntrospector.java:267) ~[spring-webmvc-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.797055552Z [inf]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.797059582Z [inf]  	at org.springframework.web.filter.CompositeFilter.doFilter(CompositeFilter.java:74) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.797063532Z [inf]  	at org.springframework.security.config.annotation.web.configuration.WebMvcSecurityConfiguration$CompositeFilterChainProxy.doFilter(WebMvcSecurityConfiguration.java:240) ~[spring-security-config-6.5.10.jar!/:6.5.10]
2026-08-12T17:23:47.797067332Z [inf]  	at org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:362) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.797074772Z [inf]  	at org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:278) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.797078672Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:23:47.797081682Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:23:47.797085772Z [inf]  	at org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:100) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.797089402Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.797092672Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:23:47.797095662Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:23:47.797098702Z [inf]  	at org.springframework.web.filter.FormContentFilter.doFilterInternal(FormContentFilter.java:93) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.797578126Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.797580926Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:23:47.797583546Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:23:47.797586026Z [inf]  	at org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:201) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.797588596Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.797591186Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:23:47.797594126Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:23:47.797596326Z [inf]  	at org.springframework.web.filter.ForwardedHeaderFilter.doFilterInternal(ForwardedHeaderFilter.java:173) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.797598326Z [inf]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116) ~[spring-web-6.2.18.jar!/:6.2.18]
2026-08-12T17:23:47.797600496Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:23:47.797602636Z [inf]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:23:47.798070751Z [inf]  	at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:165) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:23:47.798074471Z [inf]  	at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:88) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:23:47.798078341Z [inf]  	at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:492) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:23:47.798082530Z [inf]  	at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:113) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:23:47.798086350Z [inf]  	at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:83) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:23:47.798089930Z [inf]  	at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:72) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:23:47.798093350Z [inf]  	at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:342) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:23:47.798096230Z [inf]  	at org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:399) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:23:47.798099320Z [inf]  	at org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:63) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:23:47.798102510Z [inf]  	at org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:903) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:23:47.798105370Z [inf]  	at org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1797) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:23:47.798108510Z [inf]  	at org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:52) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:23:47.798112870Z [inf]  	at org.apache.tomcat.util.threads.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:973) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:23:47.798511897Z [inf]  	at org.apache.tomcat.util.threads.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:491) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:23:47.798514846Z [inf]  	at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:63) ~[tomcat-embed-core-10.1.54.jar!/:na]
2026-08-12T17:23:47.798517516Z [inf]  	at java.base/java.lang.Thread.run(Unknown Source) ~[na:na]
2026-08-12T17:23:47.798519986Z [inf]  
2026-08-12T17:23:47.976086560Z [err]  java.lang.RuntimeException: Failed to create Razorpay subscription
2026-08-12T17:23:47.976093160Z [err]  	at com.jeevan.smart_notes_api.service.RazorpayService.createSubscription(RazorpayService.java:74)
2026-08-12T17:23:47.976099250Z [err]  	at com.jeevan.smart_notes_api.service.SubscriptionService.createCheckoutSession(SubscriptionService.java:178)
2026-08-12T17:23:47.976103190Z [err]  	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(Unknown Source)
2026-08-12T17:23:47.976107360Z [err]  	at java.base/java.lang.reflect.Method.invoke(Unknown Source)
2026-08-12T17:23:47.976111190Z [err]  	at org.springframework.aop.support.AopUtils.invokeJoinpointUsingReflection(AopUtils.java:360)
2026-08-12T17:23:47.976115600Z [err]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.invokeJoinpoint(ReflectiveMethodInvocation.java:196)
2026-08-12T17:23:47.976119100Z [err]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:163)
2026-08-12T17:23:47.976122260Z [err]  	at org.springframework.transaction.interceptor.TransactionAspectSupport.invokeWithinTransaction(TransactionAspectSupport.java:380)
2026-08-12T17:23:47.976125610Z [err]  	at org.springframework.transaction.interceptor.TransactionInterceptor.invoke(TransactionInterceptor.java:119)
2026-08-12T17:23:47.976129110Z [err]  	at org.springframework.aop.framework.ReflectiveMethodInvocation.proceed(ReflectiveMethodInvocation.java:184)
2026-08-12T17:23:47.976132270Z [err]  	at org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:728)
2026-08-12T17:23:47.976140939Z [err]  	at com.jeevan.smart_notes_api.service.SubscriptionService$$SpringCGLIB$$0.createCheckoutSession(<generated>)
2026-08-12T17:23:47.976143979Z [err]  	at com.jeevan.smart_notes_api.controller.SubscriptionController.createCheckoutSession(SubscriptionController.java:50)
2026-08-12T17:23:47.976692184Z [err]  	at org.springframework.web.servlet.FrameworkServlet.service(FrameworkServlet.java:885)
2026-08-12T17:23:47.976718934Z [err]  	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(Unknown Source)
2026-08-12T17:23:47.976726774Z [err]  	at java.base/java.lang.reflect.Method.invoke(Unknown Source)
2026-08-12T17:23:47.976731444Z [err]  	at org.springframework.web.method.support.InvocableHandlerMethod.doInvoke(InvocableHandlerMethod.java:258)
2026-08-12T17:23:47.976734834Z [err]  	at org.springframework.web.method.support.InvocableHandlerMethod.invokeForRequest(InvocableHandlerMethod.java:191)
2026-08-12T17:23:47.976739064Z [err]  	at org.springframework.web.servlet.mvc.method.annotation.ServletInvocableHandlerMethod.invokeAndHandle(ServletInvocableHandlerMethod.java:118)
2026-08-12T17:23:47.976742474Z [err]  	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.invokeHandlerMethod(RequestMappingHandlerAdapter.java:991)
2026-08-12T17:23:47.976745913Z [err]  	at org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter.handleInternal(RequestMappingHandlerAdapter.java:896)
2026-08-12T17:23:47.976750283Z [err]  	at org.springframework.web.servlet.mvc.method.AbstractHandlerMethodAdapter.handle(AbstractHandlerMethodAdapter.java:87)
2026-08-12T17:23:47.976753293Z [err]  	at org.springframework.web.servlet.DispatcherServlet.doDispatch(DispatcherServlet.java:1089)
2026-08-12T17:23:47.976758213Z [err]  	at org.springframework.web.servlet.DispatcherServlet.doService(DispatcherServlet.java:979)
2026-08-12T17:23:47.976761693Z [err]  	at org.springframework.web.servlet.FrameworkServlet.processRequest(FrameworkServlet.java:1014)
2026-08-12T17:23:47.976764883Z [err]  	at org.springframework.web.servlet.FrameworkServlet.doPost(FrameworkServlet.java:914)
2026-08-12T17:23:47.976768823Z [err]  	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:590)
2026-08-12T17:23:47.977322987Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:108)
2026-08-12T17:23:47.977323647Z [err]  	at jakarta.servlet.http.HttpServlet.service(HttpServlet.java:658)
2026-08-12T17:23:47.977330507Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193)
2026-08-12T17:23:47.977333197Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:108)
2026-08-12T17:23:47.977336117Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:23:47.977339847Z [err]  	at org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:51)
2026-08-12T17:23:47.977342827Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:23:47.977346947Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:23:47.977349387Z [err]  	at org.springframework.security.web.FilterChainProxy.lambda$doFilterInternal$3(FilterChainProxy.java:231)
2026-08-12T17:23:47.977352836Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:110)
2026-08-12T17:23:47.977355726Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:370)
2026-08-12T17:23:47.977359116Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:23:47.977361786Z [err]  	at org.springframework.security.web.access.intercept.AuthorizationFilter.doFilter(AuthorizationFilter.java:101)
2026-08-12T17:23:47.977364976Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:23:47.977368776Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:23:47.977779743Z [err]  	at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:125)
2026-08-12T17:23:47.977783242Z [err]  	at org.springframework.security.web.access.ExceptionTranslationFilter.doFilter(ExceptionTranslationFilter.java:119)
2026-08-12T17:23:47.977786552Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:23:47.977793462Z [err]  	at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:131)
2026-08-12T17:23:47.977796702Z [err]  	at org.springframework.security.web.session.SessionManagementFilter.doFilter(SessionManagementFilter.java:85)
2026-08-12T17:23:47.977800282Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:23:47.977803932Z [err]  	at org.springframework.security.web.authentication.AnonymousAuthenticationFilter.doFilter(AnonymousAuthenticationFilter.java:100)
2026-08-12T17:23:47.977807102Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:23:47.977810082Z [err]  	at org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter.doFilter(SecurityContextHolderAwareRequestFilter.java:179)
2026-08-12T17:23:47.977813012Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:23:47.977816322Z [err]  	at org.springframework.security.web.savedrequest.RequestCacheAwareFilter.doFilter(RequestCacheAwareFilter.java:63)
2026-08-12T17:23:47.977820252Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:23:47.977823132Z [err]  	at com.jeevan.smart_notes_api.security.jwt.JwtFilter.doFilterInternal(JwtFilter.java:74)
2026-08-12T17:23:47.978388925Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:23:47.978392965Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:23:47.978395775Z [err]  	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:107)
2026-08-12T17:23:47.978398465Z [err]  	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:93)
2026-08-12T17:23:47.978401525Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:23:47.978405175Z [err]  	at org.springframework.web.filter.CorsFilter.doFilterInternal(CorsFilter.java:91)
2026-08-12T17:23:47.978408265Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:23:47.978411745Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:23:47.978414355Z [err]  	at org.springframework.security.web.header.HeaderWriterFilter.doHeadersAfter(HeaderWriterFilter.java:90)
2026-08-12T17:23:47.978417125Z [err]  	at org.springframework.security.web.header.HeaderWriterFilter.doFilterInternal(HeaderWriterFilter.java:75)
2026-08-12T17:23:47.978419525Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:23:47.978422185Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:23:47.978424685Z [err]  	at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:82)
2026-08-12T17:23:47.978427365Z [err]  	at org.springframework.security.web.context.SecurityContextHolderFilter.doFilter(SecurityContextHolderFilter.java:69)
2026-08-12T17:23:47.978866060Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:23:47.978868760Z [err]  	at org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter.doFilterInternal(WebAsyncManagerIntegrationFilter.java:62)
2026-08-12T17:23:47.978871030Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:23:47.978873650Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:23:47.978876240Z [err]  	at org.springframework.security.web.session.DisableEncodeUrlFilter.doFilterInternal(DisableEncodeUrlFilter.java:42)
2026-08-12T17:23:47.978878690Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:23:47.978881450Z [err]  	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:379)
2026-08-12T17:23:47.978884010Z [err]  	at org.springframework.security.web.FilterChainProxy.doFilterInternal(FilterChainProxy.java:233)
2026-08-12T17:23:47.978886180Z [err]  	at org.springframework.security.web.FilterChainProxy.doFilter(FilterChainProxy.java:191)
2026-08-12T17:23:47.978889580Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113)
2026-08-12T17:23:47.978892010Z [err]  	at org.springframework.web.filter.ServletRequestPathFilter.doFilter(ServletRequestPathFilter.java:52)
2026-08-12T17:23:47.978895160Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113)
2026-08-12T17:23:47.978897961Z [err]  	at org.springframework.web.filter.CompositeFilter.doFilter(CompositeFilter.java:74)
2026-08-12T17:23:47.978900081Z [err]  	at org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration$CompositeFilterChainProxy.doFilter(WebSecurityConfiguration.java:319)
2026-08-12T17:23:47.979529503Z [err]  	at org.springframework.web.filter.FormContentFilter.doFilterInternal(FormContentFilter.java:93)
2026-08-12T17:23:47.979532293Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113)
2026-08-12T17:23:47.979536683Z [err]  	at org.springframework.web.servlet.handler.HandlerMappingIntrospector.lambda$createCacheFilter$4(HandlerMappingIntrospector.java:267)
2026-08-12T17:23:47.979539463Z [err]  	at org.springframework.web.filter.CompositeFilter$VirtualFilterChain.doFilter(CompositeFilter.java:113)
2026-08-12T17:23:47.979542113Z [err]  	at org.springframework.web.filter.CompositeFilter.doFilter(CompositeFilter.java:74)
2026-08-12T17:23:47.979544843Z [err]  	at org.springframework.security.config.annotation.web.configuration.WebMvcSecurityConfiguration$CompositeFilterChainProxy.doFilter(WebMvcSecurityConfiguration.java:240)
2026-08-12T17:23:47.979547323Z [err]  	at org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:362)
2026-08-12T17:23:47.979550223Z [err]  	at org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:278)
2026-08-12T17:23:47.979553203Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:23:47.979556263Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:23:47.979559073Z [err]  	at org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:100)
2026-08-12T17:23:47.979561533Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:23:47.979564093Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:23:47.979567103Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:23:47.980184546Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:23:47.980191786Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:23:47.980195896Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:23:47.980199477Z [err]  	at org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:201)
2026-08-12T17:23:47.980202907Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:23:47.980206316Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:23:47.980209686Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:23:47.980213306Z [err]  	at org.springframework.web.filter.ForwardedHeaderFilter.doFilterInternal(ForwardedHeaderFilter.java:173)
2026-08-12T17:23:47.980216456Z [err]  	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:116)
2026-08-12T17:23:47.980221066Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:162)
2026-08-12T17:23:47.980224546Z [err]  	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:138)
2026-08-12T17:23:47.980228406Z [err]  	at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:165)
2026-08-12T17:23:47.980232466Z [err]  	at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:88)
2026-08-12T17:23:47.980236036Z [err]  	at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:492)
2026-08-12T17:23:47.980240016Z [err]  	at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:113)
2026-08-12T17:23:47.980914728Z [err]  	at com.razorpay.ApiClient.throwException(ApiClient.java:228)
2026-08-12T17:23:47.980921888Z [err]  	at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:83)
2026-08-12T17:23:47.980922308Z [err]  	at com.razorpay.ApiClient.processResponse(ApiClient.java:180)
2026-08-12T17:23:47.980930258Z [err]  	at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:72)
2026-08-12T17:23:47.980933098Z [err]  	at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:342)
2026-08-12T17:23:47.980935768Z [err]  	at org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:399)
2026-08-12T17:23:47.980938508Z [err]  	at org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:63)
2026-08-12T17:23:47.980941158Z [err]  	at com.razorpay.ApiClient.post(ApiClient.java:55)
2026-08-12T17:23:47.980947418Z [err]  	at org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:903)
2026-08-12T17:23:47.980948188Z [err]  	at com.razorpay.SubscriptionClient.post(SubscriptionClient.java:7)
2026-08-12T17:23:47.980952618Z [err]  	at org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1797)
2026-08-12T17:23:47.980955438Z [err]  	at org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:52)
2026-08-12T17:23:47.980957928Z [err]  	at org.apache.tomcat.util.threads.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:973)
2026-08-12T17:23:47.980960418Z [err]  	at org.apache.tomcat.util.threads.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:491)
2026-08-12T17:23:47.980962938Z [err]  	at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:63)
2026-08-12T17:23:47.980966008Z [err]  	at java.base/java.lang.Thread.run(Unknown Source)
2026-08-12T17:23:47.980968868Z [err]  Caused by: com.razorpay.RazorpayException: BAD_REQUEST_ERROR:The ID provided is invalid or could not be found.
2026-08-12T17:23:47.981222585Z [err]  	at com.razorpay.ApiClient.post(ApiClient.java:50)
2026-08-12T17:23:47.981232755Z [err]  	at com.razorpay.SubscriptionClient.post(SubscriptionClient.java:7)
2026-08-12T17:23:47.981235165Z [err]  	at com.razorpay.SubscriptionClient.create(SubscriptionClient.java:14)
2026-08-12T17:23:47.981238235Z [err]  	at com.jeevan.smart_notes_api.service.RazorpayService.createSubscription(RazorpayService.java:71)
2026-08-12T17:23:47.981241295Z [err]  	... 123 more
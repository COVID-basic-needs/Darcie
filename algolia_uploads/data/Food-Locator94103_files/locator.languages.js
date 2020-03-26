/**
 * Food Locator Application - Translations
 *
 * @author Joshua R. Thomas
 * @version 2.1
 */
Locator.constant('Languages',{
	en : {
		LangName : "English",
		Back : "Back",
		StartOver : "Start Over",
		Yes : "Yes",
		No : "No",
		Search : "Search",
		Send : "Send",
		Cancel : "Cancel",
		More : "View More",
		Less : "Show Less",
		Print: "Print",
		GetFoodLink : "Find Other Resources",
		SurveyLink	: "Can you help us improve access to food? <a href='https://www.surveymonkey.com/s/JMJZVK7' target='_blank'>Take our short survey</a>.",
		SF : "San Francisco",
		Marin : "Marin",
		CountySF : "San Francisco County",
		CountyMarin : "Marin County",
		EmailPlaceholder : "Email me a link to this page",
		TextThis : "Text this to me",
		SmsModalTitle : "SMS This Site",
		SmsRates : "Standard text rates may apply",
		SmsButton : "Text It!",
		MapTitle : "View in Google Maps",
		Select : "Select",
		Unselect : "Unselect",
		ContactInfo: "Additional questions? Leave a message on our hotline, and we will call you back: 415-820-1699 ext. 1.",
		Text00 : "Welcome to the Food Locator!",
		Text10 : "Please select a language:",
		Text15 : "Any information collected on this tool will be used to provide the end user with the most appropriate referral and to improve food access in the communities we serve.",
		Text20 : "How can we help?",
		Text30 : "I am looking for food assistance",
		Text40 : "Frequently asked questions about the Food Bank programming",
		Text45 : "I want to check the status of my pantry application - Enrollment, Transfer, Waitlist.",
		Text46 : "To check the status of your application, please complete the fields below and press search.",
		Text50 : "Please enter zip code",
		Text55 : "Please select county",
		Text60 : "Click here if zip code is known",
		Text65 : "Click here if zip code is unknown",
		Text69 : "Check all that apply to you or someone in your household",
		Text70 : "60 years of age or older",
		Text75 : "an adult living with disabilities",
		Text80 : "Select the program",
		Text90 : "Free, weekly groceries from a pantry",
		Text100 : "Monthly food box for seniors",
		Text110 : "Home Delivered Groceries",
		Text120 : "in an urgent situation with no access to food",
		Text130 : "currently receiving CalFresh <small>(formerly known as Food Stamps)</small>",
		Text140 : "Please contact me to help me find out if I qualify for CalFresh (formerly known as food stamps)",
		Text150 : "have a disability that makes it difficult to leave home to get food",
		ResourcesHeading : "You may qualify for the following types of food assistance. Click on each category for details.",
		CalfreshForm : { 
			Instructions: "Please enter your contact information",
			Name : "Name",
			Phone : "Phone",
			Email : "Email",
			Sumbit : "Send",
			Success : "Your information has been sumbitted to CalFresh outreach team and a representative will contact you soon.",
			Error: "Sorry, unable to send your information. Please try again later or set up an appotinment directly at "
		},
		HdgForm:{
			Ability: "I have a physical or cognitive disability that makes it difficult to leave home to get food",
			Adult: "I am 18 years of age or older",
			Caregiver: "I or my caregiver can prepare food at home",
			FoodPrep: "I have access to a refrigerator and cooking equipment",
			Meals: "I receive less than 2 home-delivered meals per day",
			Size: "Family Size",
			Income: "My monthly household income is less than ",
			IncomeYear: "year",
			Continue : "Continue",
			CheckButton : "Check Eligibility",
			LabelName : "Name",
			FirstName : "First name",
			LastName : "Last name",
			LabelHomePhone : "Home",
			LabelCellPhone : "Cell",
			LabelNoPhone : "No Phone",
			LabelEmail : "E-Mail",
			LabelPhone : "Phone",
			CallTimeQuestion: "When is the best time to call?",
			CallTimeA : "9:00 am – 12:00 pm",
			CallTimeB : "12:00 pm – 2:00 pm",
			CallTimeC : "2:00 pm – 5:00 pm",
			ContactLanguage : "Preferred Language",
			LanguageOptions : [
				"English","廣東話","普通話","Español","Русский","Tagalog","Tiếng Việt"
			],
			FormSubmit : "Submit",
			InvalidPhone : "Please enter a valid phone number (xxx-xxx-xxxx).",
			InvalidEmail : "Please enter a valid e-mail address (name@domain.com)."
		},
		NgnsText: {
			title : "Weekly Groceries",
			zero : "No weekly groceries sites found that services the provided zip code. Please dial 211 to find other food programs and services in your area."
		},
		SfpsText: {
			title: "Monthly Food",
			zero: "No monthly food sites found that services the provided zip code. Please dial 211 to find other food programs and services in your area."
		},
		EfbsText: {
			title: "Emergency Food",
			zero: "No emergency food sites found that services the provided zip code. Please dial 211 to find other food programs and services in your area."
		},
		HdgText: {
			title: "Home Delivery"
		},
		CfsText: {
			title: "CalFresh"
		},
		HeadingText: {
			withzip	: {
				single	: "pantry serves your zip code or neighborhood.",
				plural	: "pantries serve your zip code or neighborhood."
			},
			nozip	: {
				sf		: {
					single : "pantry serves San Francisco County.",
					plural : "pantries serve San Francisco County."
				},
				marin	: {
					single : "pantry serves Marin County.",
					plural : "pantries serve Marin County."
				}
			},
			noresults		: "No pantries found.",
			orderdefault	: "Sites that have openings are displayed first, and information is updated throughout the day.",
			orderuser		: "Information is updated throughout the day.",
		},
		StatusLegend : [
			{
				title : "<span class='text-success'>Open For Enrollment -</span>",
				definition : "This site has openings and requires an enrollment form that is available at the site. Enrollment forms may take up to 2 weeks to process.",
			},
			{
				title : "<span class='text-success'>Open -</span>",
				definition : "This site has openings and does not require an enrollment form. We recommend bringing an ID with your current address.",
			},
			{
				title : "<span class='text-warning'>Waitlist only-</span>",
				definition : "This site currently has no openings. To join the waitlist, visit the site during the listed enrollment time. The Food Bank will notify you when space opens up.",
			}
		],
		EnrollStatus : "Status",
		DistroNext : "Next Distribution",
		DistroDay : "Distribution Day",
		DistroTime : "Distribution Time",
		EnrollTime : "Enrollment Time",
		EnrollPattern : "Enrollment Frequency",
		Closures : "Scheduled Closures",
		LanguagesSpoken : "Additional Languages",
		AdditionalInfo : "Additional Information",
		Wheelchair : "<b>Accessible Entrance</b>",
		Lowcook : "<b>Minimal cooking menu: </b> This pantry has food intended for people with minimal cooking facilities and/or cold storage.",
		ZipcodesServiced : "Zip Codes Served",
		CalloutSenior : "For Seniors Over 60",
		CalloutSeniorDisabled : "For seniors over 60 or adults with disabilities",
		CalloutZip : "Outside Your Zip Code",
		ContactPhone: "Contact Phone",
		Statuses: {
			open	: "Open",
			wait	: "Waitlist Only",
			enroll	: "Open For Enrollment"
		},
		EnrollPatterns: {
			1 : "Every distribution",
			2 : "Monday - Friday",
			3 : "First distribution of each month",
			4 : "Visit site for information"
		},
		DayNames : {
			Monday		: "Monday",
			Tuesday		: "Tuesday",
			Wednesday	: "Wednesday",
			Thursday	: "Thursday",
			Friday		: "Friday",
			Saturday	: "Saturday",
			Sunday		: "Sunday"
		},
		OrdinalNumbers: {
			1 : "1st",
			2 : "2nd",
			3 : "3rd",
			4 : "4th"
		},
		Messages : {
			MessageSuccess : "Message Sent!",
			MessageFailure : "Message <u>not</u> sent",
			MessageSending : "Sending...",
			ZipNotPattern	: "The zip code you entered is outside of the SF-Marin Food Bank’s service area. Please visit the <u><a href='http://www.cafoodbanks.org/find-food-assistance'>California Association of Food Banks website</a></u> to locate food assistance near you. If you do not reside in California, please visit the <u><a href='http://www.feedingamerica.org/find-your-local-foodbank/'>Feeding America website</a></u>.",
			ZipNotFound	: "Invalid Zip Code Entered" 
		},
		Sort: {
			title	: "Sort",
			zip		: "Zip",
			day		: "Day",
			timesort: "Time",
			reset	: "Reset"
		},
		AdditionalLanguages: {
			"392"	: "AMERICAN SIGN",
			"384"	: "ARABIC",
			"387"	: "BENGALI",
			"375"	: "CANTONESE",
			"383"	: "FRENCH",
			"382"	: "GERMAN",
			"380"	: "JAPANESE",
			"389"	: "KHMER/CAMBODIAN",
			"379"	: "KOREAN",
			"391"	: "LAOTIAN",
			"376"	: "MANDARIN",
			"377"	: "RUSSIAN",
			"394"	: "SAMOAN",
			"374"	: "SPANISH",
			"378"	: "TAGALOG",
			"393"	: "TOISHANESE",
			"385"	: "URDU",
			"386"	: "VIETNAMESE",
			"381"	: "WOLOF"
		}
	},
	zh : {
		LangName : "中文",
		Back : "後退",
		StartOver : "重新開始",
		Yes : "是",
		No : "否",
		Search : "查找",
		Send : "發送",
		Cancel : "取消",
		More : "瀏覽更多",
		Less : "瀏覽更少",
		Print: "打印",
		GetFoodLink : "尋找其他資源",
		SurveyLink	: "你可以幫助我們改善接進食物嗎？ <a href='https://www.surveymonkey.com/s/JMJZVK7' target='_blank'>請填答我們一份簡短的調查。</a>.",
		SF : "三藩市",
		Marin : "馬連",
		CountySF : "三藩市縣",
		CountyMarin : "馬連縣",
		EmailPlaceholder : "請將此頁的連接電郵發給我",
		TextThis : "請將此資料短信發給我",
		SmsModalTitle : "SMS此站",
		SmsRates : "標準短信收費率可能適用",
		SmsButton : "發短信！",
		MapTitle : "參看谷歌地圖",
		Select : "選擇",
		Unselect : "取消選擇",
		ContactInfo: "還有其他問題嗎？在我們的熱線留言，我們將給您回電：415-820-1699 按2 廣東話，按5國語.",
		Text00 : "歡迎前來尋找食物網站！",
		Text10 : "請選用一種語言：",
		Text15 : "任何從此工具收集的資料，將用於為終端用戶提供最適當的轉介和改善我們服務的社區接進食物的機會。",
		Text20 : "我們如何可幫助你？",
		Text30 : "我在找食物援助",
		Text40 : "有關食物庫計劃的常見問題",
		Text45 : "我想檢查我的食物站片請的狀態- 登記，轉移，候補名單。",
		Text46 : "要檢查您的申請狀態，請填寫以下搜索字段，然後按搜索。",
		Text50 : "請輸入郵區號碼",
		Text55 : "請選擇縣區",
		Text60 : "如知道郵區號碼請按此處",
		Text65 : "如不知道郵區號碼請按此處",
		Text69 : "勾選所有適用於你或你家中一人的項目",
		Text70 : "六十歲或以上",
		Text75 : "有傷殘情況的成年人",
		Text80 : "選擇計劃",
		Text90 : "每星期派發的免費食物食物站",
		Text100 : "每月長者食物盒",
		Text110 : "ZH Home Delivered Groceries",
		Text120 : "無食物的緊急情況",
		Text130 : "目前收到 CalFresh <small>（以前稱為糧食券）</small>",
		Text140 : "請與我聯絡以找出我是否符合資格領取CalFresh (前稱糧食券)",
		Text150 : "由於患有殘障，因此難以離家領取食物",
		ResourcesHeading : "你可能符合以下類型的食物援助。 請點擊每個類別了解詳情。",
		CalfreshForm : { 
			Instructions: "請輸入你的聯絡資料",
			Name : "姓名",
			Phone : "電話",
			Email : "電郵",
			Sumbit : "發送",
			Success : "你的資料已轉交 CalFresh 的外展團隊，一名代表將很快聯絡你。",
			Error: "對不起，無法發出你的資料。請稍後再嘗試，或直接在以下地點約定時間"
		},
		HdgForm:{
			Ability: "我患有身體殘障或認知障礙，因此難以離家領取食物",
			Adult: "我已經年滿18歲",
			Caregiver: "我或家居護理員可以在家中煮食物",
			FoodPrep: "我有途徑使用冰箱和烹飪設備",
			Meals: "我每天收到少於2餐送餐服務",
			Size: "家中人數",
			Income: "我的家庭每月收入低於 ",
			IncomeYear: "年",
			Continue : "繼續",
			CheckButton : "檢查資格",
			LabelName : "姓名",
			FirstName : "姓名",
			LastName : "姓氏",
			LabelHomePhone : "家庭電話",
			LabelCellPhone : "手機",
			LabelNoPhone : "沒有電話",
			LabelEmail : "電郵地址",
			LabelPhone : "電話號碼",
			CallTimeQuestion: "最佳致電時間:",
			CallTimeA : "上午9點至中午12點",
			CallTimeB : "中午12點至下午2點",
			CallTimeC : "下午2點至下午5點",
			ContactLanguage : "首選語言",
			LanguageOptions : [
				"English","廣東話","普通話","Español","Русский","Tagalog","Tiếng Việt"
			],
			FormSubmit : "遞交",
			InvalidPhone : "請輸入有效的電話號碼 (xxx-xxx-xxxx)。",
			InvalidEmail : "請輸入有效的電子郵件位址(name@domain.com)。"
		},
		NgnsText: {
			title : "每星期食物",
			zero : "在你提供的郵區找不到每星期供應食物的地點。請致電211找出你地區的其他食物計劃和服務。"
		},
		SfpsText: {
			title: "每月食物",
			zero: "在你提供的郵區找不到每月供應食物的地點。請致電211找出你地區的其他食物計劃和服務。"
		},
		EfbsText: {
			title: "緊急食物",
			zero: "在你提供的郵區找不到供應緊急食物的地點。請致電211找出你地區的其他食物計劃和服務。"
		},
		HdgText: {
			title: "運送上府"
		},
		CfsText: {
			title: "CalFresh"
		},
		HeadingText: {
			withzip	: {
				single	: "服務你郵區或鄰里的食物站。",
				plural	: "服務你郵區或鄰里的食物站。"
			},
			nozip	: {
				sf		: {
					single : "服務三藩市縣的食物站。",
					plural : "服務三藩市縣的食物站。"
				},
				marin	: {
					single : "服務馬連縣的食物站。",
					plural : "服務馬連縣的食物站。"
				}
			},
			noresults		: "找不到食物站。",
			orderdefault	: "先列出有空額的地點，資料在日間予以更新。",
			orderuser		: "資料在日間予以更新。",
		},
		StatusLegend : [
			{
				title : "<span class='text-success'>開放加入 -</span>",
				definition : "此地點有空額，需要填交加入表格，表格可在該地點索取。加入表格需要兩個星期處理。",
			},
			{
				title : "<span class='text-success'>開放 -</span>",
				definition : "此地點有空額，無須填加入表格。我們建議你帶一張有你目前住址的身份證明前往。",
			},
			{
				title : "<span class='text-warning'>只有輪候名單 -</span>",
				definition : "此地點目前無空額。加入輪候名單，請在列出的加入時間前往地點。食物庫會在有空額出現時通知你。",
			}
		],
		EnrollStatus : "狀況",
		DistroNext : "下次派發",
		DistroDay : "派發日期",
		DistroTime : "派發時間",
		EnrollTime : "加入時間",
		EnrollPattern : "開放加入頻率",
		Closures : "關閉日期",
		LanguagesSpoken : "其他語言",
		AdditionalInfo : "附加資料",
		Wheelchair : "<b>無障礙環境</b>",
		Lowcook : "<b>小烹飪菜單:</b> 這食物站的食物適合沒有烹飪設施和/或冰箱的人士。",
		ZipcodesServiced : "服務郵區",
		CalloutSenior : "六十歲以上的長者",
		CalloutSeniorDisabled : "六十歲以上的長者或傷殘人士",
		CalloutZip : "你郵區以外的地區",
		ContactPhone: "聯絡電話",
		Statuses: {
			open	: "開放",
			wait	: "只限輪候名單",
			enroll	: "開放加入"
		},
		EnrollPatterns: {
			1 : "每次派發",
			2 : "星期一至星期五",
			3 : "每個月第一次派發",
			4 : "往食物站查問資料"
		},
		DayNames : {
			Monday		: "星期一",
			Tuesday		: "星期二",
			Wednesday	: "星期三",
			Thursday	: "星期四",
			Friday		: "星期五",
			Saturday	: "星期六",
			Sunday		: "星期日"
		},
		OrdinalNumbers: {
			1 : "第一",
			2 : "第二",
			3 : "第三",
			4 : "第四"
		},
		Messages : {
			MessageSuccess : "信息已發送",
			MessageFailure : "信息 <u>沒有</u> 發送",
			MessageSending : "正發送…",
			ZipNotPattern : "你輸入的郵區號碼是在三藩市－馬連食物庫服務地區以外。請瀏覽 <a href='http://www.cafoodbanks.org/find-food-assistance'>加州食物庫協會網站</a> 找出近你所在地方的食物援助計劃。如你不住在加州，請瀏覽 <a href='http://www.feedingamerica.org/find-your-local-foodbank/'>Feeding America網站</a>.",
			ZipNotFound	: "輸入的郵區號碼無效" 
		},
		Sort: {
			title	: "分類",
			zip		: "郵區號碼",
			day		: "日期",
			timesort: "時間",
			reset	: "重設"
		},
		AdditionalLanguages: {
			"392"	: "美國手語",
			"384"	: "阿拉伯語",
			"387"	: "孟加拉語",
			"375"	: "粵語",
			"383"	: "法語",
			"382"	: "德語",
			"380"	: "日語",
			"389"	: "高棉／柬埔寨語",
			"379"	: "韓語",
			"391"	: "寮語",
			"376"	: "普通話",
			"377"	: "俄語",
			"394"	: "薩摩亞語",
			"374"	: "西班牙語",
			"378"	: "菲律賓語",
			"393"	: "台山話",
			"385"	: "烏爾都語",
			"386"	: "越語",
			"381"	: "沃洛夫語"
		}
	},
	es : {
		LangName : "Español",
		Back : "Regresar",
		StartOver : "Volver al inicio",
		Yes : "Sí",
		No : "No",
		Search : "Buscar",
		Send : "Enviar",
		Cancel : "Cancelar",
		More : "Ver Mas",
		Less : "Ver menos",
		Print: "Imprimir",
		GetFoodLink : "Encontrar Otros Recursos",
		SurveyLink	: "¿Nos puede ayudar a mejorar el acceso a alimentos? <a href='https://www.surveymonkey.com/s/JMJZVK7' target='_blank'>Participa en nuestra breve encuesta</a>.",
		SF : "San Francisco",
		Marin : "Marin",
		CountySF : "El Condado de San Francisco",
		CountyMarin : "El Condado de Marin",
		EmailPlaceholder : "Envíame un link a esta página por email",
		TextThis : "Envíame esto por texto",
		SmsModalTitle : "Mandar texto a esta despensa",
		SmsRates : "Tarifas estándares de texto pueden aplicar",
		SmsButton : "¡Mándalo por texto!",
		MapTitle : "Ver en Google Mapas",
		Select : "Seleccionar",
		Unselect : "Deseleccionar",
		ContactInfo: "¿Tiene más preguntas? Deje un mensaje en nuestra línea directa, y le devolveremos la llamada: 415-820-1699 ext. 4",
		Text00 : "¡Bienvenidos al Localizador de Alimentos!",
		Text10 : "Por favor seleccione un idioma:",
		Text15 : "Toda la información captada por este sistema será utilizada para entregar la referencia más adecuada y para mejorar el acceso a alimentos en las comunidades que servimos.",
		Text20 : "¿Cómo le podemos ayudar?",
		Text30 : "Estoy buscando asistencia de alimentos",
		Text40 : "Preguntas frecuentes sobre la programación del Banco de Alimentos",
		Text45 : "Quiero revisar el estado de mi solicitud de despensa - Inscripción, Transferencia, Lista de Espera",
		Text46 : "Para revisar el estado de su solicitud, favor de llenar la información en los espacios que aparecen debajo y después seleccionar \"Buscar.\"",
		Text50 : "Por favor ingresar código postal",
		Text55 : "Por favor seleccionar condado",
		Text60 : "Haga clic aquí si sabe su código postal",
		Text65 : "Haga clic aquí si no se sabe el código postal",
		Text69 : "Marcar todo lo que aplica para usted o alguien en su hogar",
		Text70 : "60 años de edad o más",
		Text75 : "un adulto que vive con discapacidad",
		Text80 : "Seleccione el programa",
		Text90 : "Alimentos semanales gratis de una despensa",
		Text100 : "Caja de comida mensual para personas mayores",
		Text110 : "ES Home Delivered Groceries",
		Text120 : "en una situación de urgencia, sin acceso a comida",
		Text130 : "actualmente recibiendo CalFresh <small> (anteriormente conocido como Estampillas de Comida) </small>",
		Text140 : "Por favor, llámeme para averiguar mi elegibilidad para el programa de CalFresh (anteriormente conocido como estampillas para comida)",
		Text150 : "tiene una discapacidad que le dificulta salir de casa a comprar alimentos",
		ResourcesHeading : "Usted puede calificar para los siguientes tipos de asistencia alimentaria. Oprime cada categoría para los detalles.",
		CalfreshForm : { 
			Instructions: "Por favor, ingrese su información de contacto",
			Name : "Nombre",
			Phone : "Teléfono",
			Email : "Email",
			Sumbit : "Enviar",
			Success : "Su información se ha enviado al equipo de Calfresh y un representante le contactará pronto.",
			Error: "Lo sentimos, no se puede enviar su información. Por favor, inténtelo de nuevo más tarde o concierte una cita directamente en"
		},
		HdgForm:{
			Ability: "Tengo una discapacidad física o cognitiva que me dificulta salir de casa para comprar alimentos",
			Adult: "Tengo o soy mayor de 18 años",
			Caregiver: "Mi Proveedor de cuidado personal o yo preparamos comida en casa",
			FoodPrep: "Tengo acceso a un refrigerador y equipo necesario para cocinar los alimentos",
			Meals: "Recibo menos de 2 comidas preparadas por entrega de comida a domicilio",
			Size: "Numero de personas en el hogar",
			Income: "El ingreso mensual de mi hogar es menos de ",
			IncomeYear: "anual",
			Continue : "continuar",
			CheckButton : "Revise elegibilidad",
			LabelName : "Nombre",
			FirstName : "Primer nombre",
			LastName : "Apellido",
			LabelHomePhone : "Casa",
			LabelCellPhone : "Celular",
			LabelNoPhone : "Ninguno",
			LabelEmail : "Correo electrónico",
			LabelPhone : "Teléfono",
			CallTimeQuestion: "¿Qué hora es mejor para llamarle?",
			CallTimeA : "9:00 am – 12:00 pm",
			CallTimeB : "12:00 pm – 2:00 pm",
			CallTimeC : "2:00 pm – 5:00 pm",
			ContactLanguage : "Idioma principal",
			LanguageOptions : [
				"English","廣東話","普通話","Español","Русский","Tagalog","Tiếng Việt"
			],
			FormSubmit : "Enviar",
			InvalidPhone : "Introduzca un número de teléfono válido (xxx-xxx-xxxx).",
			InvalidEmail : "Introduzca una dirección de correo electrónico válida (name@domain.com) ."
		},
		NgnsText: {
			title : "Alimentos Semanales",
			zero : "No se encontraron sitios de alimentos semanales que proporcionan servicios al código postal ingresado. Por favor marque 211 para encontrar otros programas y servicios de comida en su área."
		},
		SfpsText: {
			title: "Alimentos Mensuales",
			zero: "No se encontraron sitios de comida mensual que proporcionan servicios al código postal ingresado. Por favor marque 211 para encontrar otros programas y servicios de comida en su área."
		},
		EfbsText: {
			title: "Alimentos de Emergencia",
			zero: "No se encontraron sitios de alimentos de emergencia que proporcionan servicios al código postal ingresado. Por favor marque 211 para encontrar otros programas y servicios de comida en su área."
		},
		HdgText: {
			title: "Entrega a Domicilio"
		},
		CfsText: {
			title: "CalFresh"
		},
		HeadingText: {
			withzip	: {
				single	: "la despensa sirve su código postal o barrio.",
				plural	: "las despensas sirven su código postal o barrio."
			},
			nozip	: {
				sf		: {
					single : "la despensa sirve el Condado de San Francisco.",
					plural : "las despensas sirven el Condado de San Francisco."
				},
				marin	: {
					single : "la despensa sirve el Condado de Marin.",
					plural : "las despensas sirven el Condado de Marin."			

				}
			},
			noresults		: "No se encontraron despensas.",
			orderdefault	: "Las despensas que tienen cupos se muestran primero, y la información se actualiza durante todo el día.",
			orderuser		: "La información se actualiza durante todo el día."
		},
		StatusLegend : [
			{
				title : "<span class='text-success'>Abierto para inscripciones -</span>",
				definition : "Esta despensa tiene cupo y requiere un formulario de inscripción que está disponible en el sitio. Procesar los formularios de inscripción puede tomar hasta 2 semanas."
			},
			{
				title : "<span class='text-success'>Abierto -</span>",
				definition : "Esta despensa tiene cupo y no requiere de un formulario de inscripción. Se recomienda que igual traiga una forma de identificación que tenga su domicilio actual."
			},
			{
				title : "<span class='text-warning'>Solo lista de espera -</span>",
				definition : "Esta despensa no tiene cupo actualmente. Para poner su nombre en la lista de espera, visite el sitio durante el horario de inscripción escrito. El Banco de Alimentos le notificará cuando haya cupo."
			}
		],
		EnrollStatus : "Estado",
		DistroNext : "Siguiente distribución",
		DistroDay : "Día de distribución",
		DistroTime : "Horario de distribución",
		EnrollTime : "Horario de inscripción",
		EnrollPattern : "Frecuencia de inscripción",
		Closures : "Cierres programados",
		LanguagesSpoken : "Idiomas Adicionales",
		AdditionalInfo : "Información adicional",
		Wheelchair : "<b>Entrada accesible</b>",
		Lowcook : "<b>Menú de preparación de cocina mínima:</b> Esta despensa es para personas con cocina limitada y/o con refrigeración limitada.",
		ZipcodesServiced : "Códigos postales atendidos",
		CalloutSenior : "Para mayores de 60 años",
		CalloutSeniorDisabled : "Para mayores de 60 años o adultos con discapacidades",
		CalloutZip : "Fuera de su código postal",
		ContactPhone: "Numero de Contacto",
		Statuses: {
			open	: "Abierto",
			wait	: "Solo lista de espera",
			enroll	: "Abierto para Inscripciones"
		},
		EnrollPatterns: {
			1 : "Cada distribución",
			2 : "Lunes - Viernes",
			3 : "Primera distribución de cada mes",
			4 : "Visite la despensa para información"
		},
		DayNames : {
			Monday		: "Lunes",
			Tuesday		: "Martes",
			Wednesday	: "Miércoles",
			Thursday	: "Jueves",
			Friday		: "Viernes",
			Saturday	: "Sábado",
			Sunday		: "Domingo"
		},
		OrdinalNumbers: {
			1 : "1er",
			2 : "2º",
			3 : "3er",
			4 : "4º"
		},
		Messages : {
			MessageSuccess : "¡Mensaje Enviado!",
			MessageFailure : "Mensaje <u>no</u> enviado",
			MessageSending : "Enviando…",
			ZipNotPattern : "El código postal que ha ingresado se encuentra fuera del área de servicio del Banco de Alimentos de SF-Marin. Por favor, visite el sitio de web de la <a href='http://www.cafoodbanks.org/find-food-assistance'>Asociación de Bancos de Alimentos de California</a> para localizar asistencia alimentaria cerca de usted. Si usted no reside en California, por favor visite el <a href='http://www.feedingamerica.org/find-your-local-foodbank/'>sitio de web de Feeding America</a>.",
			ZipNotFound	: "Código postal ingresado no válido" 
		},
		Sort: {
			title	: "Ordenar",
			zip		: "Código Postal",
			day		: "Día",
			timesort: "Horario",
			reset	: "Reiniciar"
		},
		AdditionalLanguages: {
			"392"	: "Lenguaje de Señas Americano",
			"384"	: "ÁRABE",
			"387"	: "BENGALI",
			"375"	: "CANTONES",
			"383"	: "FRANCÉS",
			"382"	: "ALEMAN",
			"380"	: "JAPONÉS",
			"389"	: "KHMER / CAMBOYANO",
			"379"	: "COREANO",
			"391"	: "LAOSIANO ",
			"376"	: "MANDARIN",
			"377"	: "RUSO",
			"394"	: "SAMOANO",
			"374"	: "ESPAÑOL",
			"378"	: "TAGALOG",
			"393"	: "TOISHANESE",
			"385"	: "URDU",
			"386"	: "VIETNAMITA",
			"381"	: "WOLOF"
		}
	},
	ru : {
		LangName : "Русский",
		Back : "Назад",
		StartOver : "Начните сначала",
		Yes : "Да",
		No : "Нет",
		Search : "Поиск",
		Send : "Послать",
		Cancel : "Отмена",
		More : "Посмотреть больше",
		Less : "Посмотреть меньше",
		Print: "Печатать",
		GetFoodLink : "Найти Другие  Источники",
		SurveyLink	: "Хотите помочь нам улучшить доступ к продовольствию? <a href='https://www.surveymonkey.com/s/JMJZVK7' target='_blank'>Ответьте  на наши вопросы</a>.",
		SF : "Сан-Франциско",
		Marin : "Марин",
		CountySF : "Область Сан-Франциско",
		CountyMarin : "Область Марин",
		EmailPlaceholder : "Пошлите по email ссылку на эту страницу",
		TextThis : "Пошлите мне СМС",
		SmsModalTitle : "Пошлите  мне  СМС  этого сайта",
		SmsRates : "Может быть применена стандартная  оплата за текст",
		SmsButton : "Отправьте текстовое сообщение!",
		MapTitle : "Посмотрите  в картах Googlе ",
		Select : "Выберите",
		Unselect : "Отменить",
		ContactInfo: "Дополнительные вопросы? Оставьте сообщение на нашей горячей линии, и мы вам перезвоним: 415-820-1699 доб.3.",
		Text00 : "Добро пожаловать в Food Locator!",
		Text10 : "Выберите язык:",
		Text15 : "Любая информация, собранная в этой программе, будет использоваться, чтобы предоставить любому пользователю наиболее подходящую рекомендацию и улучшить  доступ к продовольствию.",
		Text20 : "Как  мы можем помочь?",
		Text30 : "Я ищу продовольственную помощь",
		Text40 : "Часто задаваемые вопросы о программировании Фуд Банка",
		Text45 : "хочу проверить статус моей заявки в pantry -Регистрация, Перевод, Список ожидания.",
		Text46 : "Чтобы проверить статус вашей заявки, пожалуйста, заполните строчки ниже и нажмите кнопку Поиск.",
		Text50 : "Пожалуйста, введите Zip код",
		Text55 : "Пожалуйста, выберите город",
		Text60 : "Нажмите здесь, если Zip код известен",
		Text65 : "Нажмите здесь, если Zip код не известен",
		Text69 : "Отметьте все, что относится к Вам или к кому-то из Вашей семьи",
		Text70 : "Возраст  60 лет и старше",
		Text75 : "взрослый человек с ограниченными возможностями",
		Text80 : "Выберите программу",
		Text90 : "Бесплатные еженедельные продукты из pantry",
		Text100 : "Ежемесячный продуктовый ящик для пожилых людей",
		Text110 : "RU Home Delivered Groceries",
		Text120 : "в срочной ситуации без доступа к еде",
		Text130 : "в настоящее время получают Calfresh <small> (ранее известные как фудстемпы) </small>",
		Text140 : "Пожалуйста, свяжитесь со мной, чтобы помочь мне выяснить, могу ли я участвовать в программе CalFresh (ранее известной как  фудстемпы)",
		Text150 : "У меня инвалидность, затрудняющая покинуть мой дом чтобы получать продукты",
		ResourcesHeading : "Вы можете претендовать на следующие виды продовольственной помощи. Подробнее нажмите на каждую рубрику.",
		CalfreshForm : { 
			Instructions: "Пожалуйста, введите Вашу контактную информацию",
			Name : "Имя",
			Phone : "Телефон",
			Email : "Email",
			Sumbit : "Отправить",
			Success : "Ваша информация была отправлена работникам calfresh и представитель обязательно свяжется с вами.",
			Error: "К сожалению, не удалось отправить Вашу информацию. Пожалуйста, повторите попытку позже или назначьте встречу непосредственно на сайте"
		},
		HdgForm:{
			Ability: "У меня физическое или когнитивное расстройство, затрудняющое покинуть мой дом чтобы получать продукты",
			Adult: "Мне 18 лет или больше",
			Caregiver: "Я или мой помощник по уходу в состоянии приготовлять пищу дома",
			FoodPrep: "У меня есть доступ к холодильнику и к оборудованию для приготовления пищи",
			Meals: "Я получаю меньше двух доставляемых домой приготовленных блюд в день",
			Size: "Размер семьи",
			Income: "Ежемесячный доход моей семьи составляет менее ",
			IncomeYear: "в год",
			Continue : "Продолжать",
			CheckButton : "Определение Вашего Права на получение помощи",
			LabelName : "Ваше",
			FirstName : "Имя",
			LastName : "Фамилия",
			LabelHomePhone : "Домашний",
			LabelCellPhone : "Мобильный",
			LabelNoPhone : "Не имеется",
			LabelEmail : "Е-мейл",
			LabelPhone : "Телефон",
			CallTimeQuestion: "Лучшее время позвонить Вам:",
			CallTimeA : "9:00 утра- 12:00 дня",
			CallTimeB : "12:00 дня- 2:00 дня",
			CallTimeC : "2:00 дня- 5:00 дня",
			ContactLanguage : "Предпочитительный язык",
			LanguageOptions : [
				"English","廣東話","普通話","Español","Русский","Tagalog","Tiếng Việt"
			],
			FormSubmit : "Представьте",
			InvalidPhone : "Введите действительный номер телефона (xxx-xxx-xxxx).",
			InvalidEmail : "Введите действительный адрес электронной почты (name@domain.com)."
		},
		NgnsText: {
			title : "Еженедельные Продукты",
			zero : "Сайтов с еженедельными продуктами по обслуживанию приведенного Вами Zip кода не найдено. Наберите 2-11, чтобы найти другие программы питания и услуги в Вашем регионе."
		},
		SfpsText: {
			title: "Ежемесячное Продовольствие",
			zero: "Сайтов с ежемесячными продуктами по обслуживанию приведенного Вами Zip кода не найдено. Наберите 2-11, чтобы найти другие программы питания и услуги в Вашем регионе."
		},
		EfbsText: {
			title: "Продовольствие для чрезвычайных происшествий",
			zero: "Сайтов с продовольствием  для чрезвычайных происшествий  по обслуживанию приведенного Вами Zip кода не найдено . Наберите 2-11,ву чтобы найти другие программы питания и услуги в Вашем регионе."
		},
		HdgText: {
			title: "Доставка на дом"
		},
		CfsText: {
			title: "CalFresh"
		},
		HeadingText: {
			withzip	: {
				single	: "pantry обслуживает Ваш Zip код или район.",
				plural	: "pantries обслуживают Ваш Zip код или район."
			},
			nozip	: {
				sf		: {
					single : "pantry обслуживает  город Сан-Франциско.",
					plural : "pantries serve San Francisco County."
				},
				marin	: {
					single : "pantry serves Marin County.",
					plural : "pantries  обслуживает  город Сан-Франциско."
				}
			},
			noresults		: "не найдено.",
			orderdefault	: "Сайты, которые имеют свободные места отображаются первыми, и информация обновляется в течение дня.",
			orderuser		: "Информация обновляется в течение дня."
		},
		StatusLegend : [
			{
				title : "<span class='text-success'>Открыто Для Приема  Заявлений -</span>",
				definition : "Этот сайт имеет свободные места. Необходимо заполнить форму регистрации, которая доступна на сайте.  Обработка формы регистрации занимает около  двух недель."
			},
			{
				title : "<span class='text-success'>Открыто -</span>",
				definition : "Этот сайт имеет свободные места и не требует регистрации. Мы рекомендуем иметь при себе удостоверение личности с Вашим настоящим адресом."
			},
			{
				title : "<span class='text-warning'>Только лист ожидания -</span>",
				definition : "На данный момент этот сайт не имеет свободных  мест. Чтобы записаться на лист ожидания, придите на сайт в течение указанного времени регистрации. Фуд Банк  уведомит  Вас, когда появятся свободные места."
			}
		],
		EnrollStatus : "Статус",
		DistroNext : "Следующая Выдача",
		DistroDay : "День Выдачи",
		DistroTime : "Время Выдачи",
		EnrollTime : "Время Регистрации",
		EnrollPattern : "Периодичность Регистрации",
		Closures : "Расписание Временных Закрытий",
		LanguagesSpoken : "Дополнительные Языки",
		AdditionalInfo : "Дополнительная информация",
		Wheelchair : "<b>Доступная среда</b>",
		Lowcook : "<b>Меню, не требующий полную кухню.</b> Продукты в этот pantry являются пригодным тем, у кого нет плиты и духовки и/или холодильника.",
		ZipcodesServiced : "Обслуживаемые  Zip коды",
		CalloutSenior : "Для Пожилых Людей Старше 60 Лет",
		CalloutSeniorDisabled : "Для пожилых людей старше 60 лет или взрослых с ограниченными возможностями",
		CalloutZip : "За Пределами Вашего Zip кода",
		ContactPhone: "Контактный Телефон",
		Statuses: {
			open	: "Открыто",
			wait	: "Только Лист Ожидания",
			enroll	: "Открыт Прием Заявлений"
		},
		EnrollPatterns: {
			1 : "Каждая выдача",
			2 : "Понедельник - Пятница",
			3 : "Первая выдача каждогого месяца",
			4 : "Посетите сайт для получения информации"
		},
		DayNames : {
			Monday		: "Понедельник",
			Tuesday		: "Вторник",
			Wednesday	: "Среда",
			Thursday	: "Четверг",
			Friday		: "Пятница",
			Saturday	: "Суббота",
			Sunday		: "Воскресенье"
		},
		OrdinalNumbers: {
			1 : "1-й ",
			2 : "2-й",
			3 : "3-й",
			4 : "4-й"
		},
		Messages : {
			MessageSuccess : "Сообщение Отправлено!",
			MessageFailure : "Сообщение <u>не</u> отправлено",
			MessageSending : "Отправка...",
			ZipNotPattern : "Вы ввели Zip код за пределами зоны обслуживания Фуд Банка СФ-Марин. Пожалуйста, посетите сайт <a href='http://www.cafoodbanks.org/find-food-assistance'>California Association of Food Banks</a>, чтобы найти продовольственную помощь рядом с Вами. Если Вы не проживаете в Калифорнии, пожалуйста, посетите сайт <a href='http://www.feedingamerica.org/find-your-local-foodbank'>Feeding America</a>.",
			ZipNotFound	: "Введен неправильный Zip код" 
		},
		Sort: {
			title	: "Сортировать по",
			zip		: "Zip",
			day		: "День",
			timesort: "Время",
			reset	: "Перезагрузить"
		},
		AdditionalLanguages: {
			"392"	: "АМЕРИКАНСКИЙ ЯЗЫК ЖЕСТОВ",
			"384"	: "АРАБСКИЙ",
			"387"	: "БЕНГАЛЬСКИЙ",
			"375"	: "КАНТОНСКИЙ",
			"383"	: "ФРАНЦУЗСКИЙ",
			"382"	: "НЕМЕЦКИЙ",
			"380"	: "ЯПОНСКИЙ",
			"389"	: "КХМЕРСКИЙ/КАМБОДЖИЙСКИЙ",
			"379"	: "КОРЕЙСКИЙ",
			"391"	: "ЛАОССКИЙ",
			"376"	: "МАНДАРИН",
			"377"	: "РУССКИЙ",
			"394"	: "САМОАНСКИЙ",
			"374"	: "ИСПАНСКИЙ",
			"378"	: "ТАГАЛЬСКИЙ",
			"393"	: "ТАЙШАНЬСКИЙ ДИАЛЕКТ",
			"385"	: "УРДУ",
			"386"	: "ВЬЕТНАМСКИЙ",
			"381"	: "ВОЛОФ"
		}
	},
	tl : {
		LangName : "Tagalog",
		Back : "Bumalik",
		StartOver: "Mag-umpisa muli",
		Yes : "Oo",
		No : "Hindi",
		Search : "Hanapin/Maghanap",
		Send : "Ipadala",
		Cancel : "Kanselahin",
		More : "Magtingin pa",
		Less : "Paikliin and lista",
		Print: "I-print",
		GetFoodLink : "Humanap ng ibang mapagkukunan",
		SurveyLink: "May maitutulong ka ba upang mapabuti ang pagkuha ng pagkain? <a href='https://www.surveymonkey.com/s/JMJZVK7' target='_blank'>Sagutin ang maikling pagsusuri</a>.",
		SF : "San Francisco",
		Marin : "Marin",
		CountySF : "San Francisco County",
		CountyMarin : "Marin County",
		EmailPlaceholder : "I-email sa akin ang koneksyon nito",
		TextThis : "I-text sa akin",
		SmsModalTitle : "Magpadala na maikling mensahe sa lokasyon",
		SmsRates : "Karaniwang halaga ng text ang maaring gamitin",
		SmsButton : "I-text ito!",
		MapTitle : "Tignan sa mapa ng Google",
		Select : "Piliin",
		Unselect : "Huwag Piliin",
		ContactInfo: "Karagdagang katanungan?  Magiwan ng mensahe sa aming linya ng telepono, at babalikan namin ang tawag mo: 415-820-1699 ext. 1.",
		Text00 : "Maligayang pagbati mula sa Food Locator!",
		Text10 : "Mamili ng Wika:", 
		Text15 : "Anumang impormasyon ang makukuha mula sa iyo ay gagamitin upang makatulong at mabigyan ng tamang pagsangguni at upang mapabuti ang pamamahagi ng pagkain sa mga komunidad na aming tinutulungan.",
		Text20 : "Paano kami makakatulong?",
		Text30 : "Ako ay naghahanap ng tulong para sa pagkain",
		Text40 : "Mga kadalasang katanungan tungkol sa programa ng Bangko ng Pagkain",
		Text45 : "Gusto kong rebisahin ang estado ng aking aplikasyon sa paminggalan - Pagpapatala, Pagpapalipat, Listahan ng Naghihintay",
		Text46 : "Upang alamin ang estado ng iyong aplikasyon, mangyaring kumpletuhin ang mga patlang sa ibaba at pindutin ang hanapin.",
		Text50 : "Ilagay ang zip code",
		Text55 : "Piliin ang county",
		Text60 : "I-klik dito kung alam ang zip code",
		Text65 : "I-klik dito kung hindi alam ang zip code",
		Text69 : "I-tsek kung ang lahat ay tumutugon sa iyo o sa kung sino man sa iyong sambahayan",
		Text70 : "animnapung (60) taong gulang o mahigit",
		Text75 : "adulto na naninirahan na may kapansanan",
		Text80 : "Mamili ng programa",
		Text90 : "Libre, lingguhang groseria mula sa pantry",
		Text100 : "Buwanang kahon ng pagkain para sa matanda (seniors)",
		Text110 : "TL Home Delivered Groceries",
		Text120 : "matinding kalagayan at walang mapagkunan ng pagkain",
		Text130 : "kasalukuyang nakakatanggap mula sa CalFresh <small>(dating kilala na Food Stamps)</small>",
		Text140 : "Kung maaari, pwede ninyo po ba akong tulungan malaman kung qualified po ako sa CalFresh program (yung noong tinatawag na food stamps)",
		Text150 : "May kapansanan na nagpapahirap sa pag-alis ng bahay upang kumuha ng pagkain",
		ResourcesHeading : "Ikaw ay karapat-dapat sa mga sumusunod na tulong para sa pagkain. Mag-click sa bawat kategorya para sa mga detalye.",
		CalfreshForm : { 
			Instructions: "Ilagay ang iyong impormasyon para sa ugnayan",
			Name : "Pangalan",
			Phone : "Telepono",
			Email : "Email",
			Sumbit : "Ipadala",
			Success : "Ang iyong impormasyon ay naisumite na sa CalFresh  outreach team at may kinatawan na makikipag-ugnayan sa inyo sa madaling panahon.",
			Error: "Ikinalulungkot namin, hindi naipadala ang inyong impormasyon.  Subukan muli o direktang humingi ng apoyntment sa"
		},
		HdgForm:{
			Ability: "Mayroon akong kapansanan sa pisikal o kamalayan na nagpapahirap sa akin na makaalis ng bahay upang kumuha ng pagkain",
			Adult: "Ako ay 18 taong gulang o mas matanda pa",
			Caregiver: "Ako o ang aking tagapag-alaga ay maaring makapag-handa ng pagkain sa bahay",
			FoodPrep: "Mayroon akong palamigan(repridyereytor) at gamit sa pagluluto",
			Meals: "Ako ay nakatatanggap ng mas mababa pa sa 2 beses ng hatid na pagkain sa bahay kada araw",
			Size: "Sukat ng Pamilya",
			Income: "Ang kinikita ng aking sambahayan ay mas mababa pa sa ",
			IncomeYear: "year",
			Continue : "magpatuloy",
			CheckButton : "Suriin kung karapat-dapat",
			LabelName : "Pangalan",
			FirstName : "Pangalan",
			LastName : "Apelyido",
			LabelHomePhone : "Bahay",
			LabelCellPhone : "Cell",
			LabelNoPhone : "Walang telepono",
			LabelEmail : "E-Mail",
			LabelPhone : "Telepono",
			CallTimeQuestion: "Kailan ang pinaka-mainam na oras upang tumawag?",
			CallTimeA : "9:00 ng umaga - 12:00 ng tanghali",
			CallTimeB : "12:00 ng tanghali - 2:00 ng hapon",
			CallTimeC : "2:00 ng hapon – 5:00 ng hapon",
			ContactLanguage : "Nais na Wika",
			LanguageOptions : [
				"English","廣東話","普通話","Español","Русский","Tagalog","Tiếng Việt"
			],
			FormSubmit : "Ipasa",
			InvalidPhone : "Mangyaring magpasok ng wastong numero ng telepono (xxx-xxx-xxxx).",
			InvalidEmail : "Mangyaring magpasok ng isang wastong e-mail address (name@domain.com)."
		},
		NgnsText: {
			title : "Lingguhang Groseria",
			zero : "Walang lingguhang groseria  sa lugar na nakakasakop sa  nasabing zip code.  Tumawag sa 211 upang makahanap ng ibang programa sa pagkain at ibang serbisyo sa inyong lugar. "
		},
		SfpsText: {
			title: "Buwanang Pagkain",
			zero: "Walang buwanang pagkain sa lugar na nakakasakop sa nasabing zip code.  Tumawag sa 211 upang makahanap ng ibang programa sa pagkain at ibang serbisyo sa inyong lugar."
		},
		EfbsText: {
			title: "Pagkaing Pang-kagipitan",
			zero: "Walang pagkaing pang-kagipitan sa lugar na nakakasakop sa nasabing zip code.  Tumawag sa 211 upang makahanap ng ibang programa sa pagkain at ibang serbisyo sa inyong lugar."
		},
		HdgText: {
			title: "Hatid sa Bahay"
		},
		CfsText: {
			title: "CalFresh"
		},
		HeadingText: {
			withzip	: {
				single	: "pantry na nagsisilbi sa iyong zip code o kapaligiran.",
				plural	: "mga pantry na nagsisilbi sa iyong zip code o kapaligiran."
			},
			nozip	: {
				sf		: {
					single : "Pantry na nagsisilbi sa San Francisco County.",
					plural : "mga pantry na nagsisilbi sa San Francisco County."
				},
				marin	: {
					single : "pantry na nagsisilbi sa Marin County.",
					plural : "mga pantry na nagsisilbi sa Marin County."
				}
			},
			noresults		: "Walang pantry na matatagpuan.",
			orderdefault	: "Mga lugar na may bakante ang unang makikita, at ang impormasyon ay palagiang itinatama sa buong araw.",
			orderuser		: "Ang impormasyon ay itinatama sa buong araw.",
		},
		StatusLegend : [
			{
				title : "<span class='text-success'>Bukas para sa Pagpapalista -</span>",
				definition : "Ang lugar na ito ay may bakante at kinakailangan ng form para magpalista na makukuha sa lugar na ito.  Ang pagpapalista ay maaring tumagal ng dalawang (2) linggo para sa proseso.",
			},
			{
				title : "<span class='text-success'>Bukas -</span>",
				definition : "Ang lugar na ito ay may bakante at hindi kailangan ng form para magpalista.  Magdala ng ID na nakasaad ang kasalukuyang tirahan.",
			},
			{
				title : "<span class='text-warning'>Listahan ng naghihintay lamang -</span>",
				definition : "Ang lugar na ito ay walang bakante.  Para makasali sa listahan ng naghihintay, bumisita sa lugar na ito tuwing  panahon ng pagpapalista.  Ang Food Bank ay ipapaalam sa iyo kung magkakaroon ng bakante.",
			}
		],
		EnrollStatus : "Lagay o Katayuan",
		DistroNext : "Susunod na Pamamahagi",
		DistroDay : "Araw ng Pamamahagi",
		DistroTime : "Oras ng Pamamahagi",
		EnrollTime : "Panahon ng Pagpapalista",
		EnrollPattern : "Dalas ng Pagpapalista",
		Closures : "Iskedyul ng Pagsasara",
		LanguagesSpoken : "Karagdagang wika",
		AdditionalInfo : "Karagdagang impormasyon",
		Wheelchair : "<b>Madaling marating na daanan</b>",
		Lowcook : "<b>Maliit na menu ng Pagluto: </b>  Ang paminggalan na ito ay may pagkaing nakalaan para sa maliit na pasilidad sa pagluluto at/o palamigang imbakan.",
		ZipcodesServiced : "Mga Zip Code na Nasisilbihan",
		CalloutSenior : "Para sa mga animnapung (60) taong gulang o mahigit pa",
		CalloutSeniorDisabled : "Para sa mga animnapung (60) taong gulang o mahigit pa o adulto na may kapansanan",
		CalloutZip : "Labas na iyong zip Code",
		ContactPhone: "Telepono",
		Statuses: {
			open	: "Bukas",
			wait	: "Listahan ng Naghihintay Lamang",
			enroll	: "Bukas para sa Pagpapalista"
		},
		EnrollPatterns: {
			1 : "Bawat Pamamahagi",
			2 : "Lunes hanggang Biyernes",
			3 : "Unang pamamahagi sa bawat buwan",
			4 : "Bumisita sa lugar para sa impormasyon"
		},
		DayNames : {
			Monday		: "Lunes",
			Tuesday		: "Martes",
			Wednesday	: "Miyerkoles",
			Thursday	: "Huwebes",
			Friday		: "Biyernes",
			Saturday	: "Sabado",
			Sunday		: "Linggo"
		},
		OrdinalNumbers: {
			1 : "Una",
			2 : "Pangalawa",
			3 : "Pang-tatlo",
			4 : "Pang-apat"
		},
		Messages : {
			MessageSuccess : "Mensahe ay Naipadala!",
			MessageFailure : "Mensahe <u>hindi</u> naipadala",
			MessageSending : "Ipinapadala...",
			ZipNotPattern : "Ang zip code na iyong inilagay ay lugar na hindi sakop ng serbisyo ng SF-Marin Food Bank.  Bisitahin ang <a href='http://www.cafoodbanks.org/find-food-assistance'>California Association of Food Banks website</a> upang humanap ng tulong sa pagkain na malapit sa iyo.  Kung hindi ka naninirahan sa Califronia, bisitahin and <a href='http://www.feedingamerica.org/find-your-local-foodbank/'>Feeding America website</a>.",
			ZipNotFound	: "iWalang bisa ang Zip Code na ipinasok" 
		},
		Sort: {
			title	: "Uriin",
			zip	: "Zip",
			day	: "Araw",
			timesort: "Oras",
			reset	: "I-reset"
		},
		AdditionalLanguages: {
			"392"	: "AMERICAN SIGN",
			"384"	: "ARABIC",
			"387"	: "BENGALI",
			"375"	: "CANTONESE",
			"383"	: "FRENCH",
			"382"	: "GERMAN",
			"380"	: "JAPANESE",
			"389"	: "KHMER/CAMBODIAN",
			"379"	: "KOREAN",
			"391"	: "LAOTIAN",
			"376"	: "MANDARIN",
			"377"	: "RUSSIAN",
			"394"	: "SAMOAN",
			"374"	: "SPANISH",
			"378"	: "TAGALOG",
			"393"	: "TOISHANESE",
			"385"	: "URDU",
			"386"	: "VIETNAMESE",
			"381"	: "WOLOF"
		}
	},
	vi : {
		LangName : "Tiếng Việt",
		Back : "Trở lại",
		StartOver : "Bắt đầu lại",
		Yes : "Đồng ý",
		No : "Không",
		Search : "Tìm kiếm",
		Send : "Gởi",
		Cancel : "Hủy bỏ",
		More : "Xem them",
		Less : "Xem ít",
		Print: "In",
		GetFoodLink : "Tìm từ các nguồn khác",
		SurveyLink	: "Quý khách có thể giúp chúng tôi cải tiến cách  phân phối thực phẩm không? <a href='https://www.surveymonkey.com/s/JMJZVK7' target='_blank'>Điền bảng khảo sát ngắn của chúng tôi</a>.",
		SF : "Thành phố San Francisco",
		Marin : "Thành phố Marin",
		CountySF : "Quận hạt San Francisco",
		CountyMarin : "Quận hạt Marin",
		EmailPlaceholder : "Email cho tôi đường liên kết đến trang này",
		TextThis : "Gởi Nhắn tin văn bản này đến tôi bằng điện thoại",
		SmsModalTitle : "Gởi trang này bằng tin nhắn trong điện thoại",
		SmsRates : "Có thể áp dụng tính phí điện thoại tiêu chuẩn",
		SmsButton : "Nhắn tin bằng điện thoại! ",
		MapTitle : "Xem bằng Bảng Đồ Google",
		Select : "Chọn lựa",
		Unselect : "Bỏ chọn",
		ContactInfo: "Có thêm câu hỏi? Để lại tin nhắn trên đường dây nóng của chúng tôi và chúng tôi sẽ gọi lại cho quí vị: 415-820-1699 ext. 1.",
		Text00 : "Chào mừng quý vị đến nơi Tìm Kiếm Thực Phẩm!",
		Text10 : "Xin chọn lựa một ngôn ngữ:",
		Text15 : "Bất kỳ thông tin được thu thập trên công cụ này sẽ dùng để cung cấp cho người sử dụng với sự giới thiệu phù hợp nhất và để cải tiến cách phân phối thực phẩm trong cộng đồng mà chúng tôi phục vụ.",
		Text20 : "Chúng tôi có thể giúp đỡ như thế nào?",
		Text30 : "Tôi đang tìm kiếm trợ giúp thực phẩm",
		Text40 : "Các câu hỏi thường gặp về chương trình Ngân Hàng Thực Phẩm (Food Bank)",
		Text45 : "Tôi Muốn kiểm tra tình trạng hồ sơ của quý  vị - Đăng ký, Chuyển đổi, Chờ đợi",
		Text46 : "Để kiểm tra tình trạng hồ sơ của quý vị , vui lòng điền vào các phần dưới đây và nhấn chữ tìm kiếm.",
		Text50 : "Xin điền mã bưu chính",
		Text55 : "Xin chọn quận hạt",
		Text60 : "Nhấn vào đây nếu biết mã bưu chính",
		Text65 : "Nhấn vào đây nếu không biết mã bưu chính",
		Text69 : "Chọn tất cả những gì áp dụng cho quý khách hoặc người khác trong gia đình của quý vị",
		Text70 : "60 tuổi trở lên",
		Text75 : "người lớn với khuyết tật",
		Text80 : "Chọn chương trình",
		Text90 : "Hàng hoá miễn phí hàng tuần từ nơi dự trữ thực phẩm",
		Text100 : "Hộp thực phẩm mỗi tháng cho người cao tuổi",
		Text110 : "VI Home Delivered Groceries",
		Text120 : "trong một tình huống khẩn cấp mà không có thực phẩm",
		Text130 : "hiện đang nhận CalFresh <small>(trước đây gọi là Food Stamps)</small>",
		Text140 : "Xin vui lòng liên lạc tôi để cho tôi biết có phù hợp yêu cầu đăng ký CalFresh (hổ trợ thực phẩm)",
		Text150 : "bị khuyết tật khiến cho khó rời khỏi nhà để lấy thức ăn",
		ResourcesHeading : "Quý vị có thể đủ điều kiện được nhận các loại trợ giúp thực phẩm sau đây. Nhấp vào từng danh mục để biết chi tiết.",
		CalfreshForm : { 
			Instructions: "Xin điền thông tin liên lạc của quý vị",
			Name : "Tên",
			Phone : "Số điện thoại",
			Email : "E-mail",
			Sumbit : "Gởi",
			Success : "Thông tin của quý vị đã được gửi đến nhóm tiếp cận cộng đồng của CalFresh và một đại diện của CalFresh sẽ liên lạc với quý vị.",
			Error: "Xin lỗi, không thể gửi thông tin của quý vị. Vui lòng thử lại sau hoặc trực tiếp thiết lập cuộc hẹn tại"
		},
		HdgForm:{
			Ability: "Tôi có khuyết tật thể chất hoặc kiến thức cho nên khó rời khỏi nhà để đi nhận thức ăn",
			Adult: "Tôi 18 tuổi trở lên",
			Caregiver: "Tôi hoặc người chăm sóc của tôi có thể chuẩn bị thức ăn tại nhà",
			FoodPrep: "Tôi có thể sử dụng tủ lạnh và thiết bị nấu ăn",
			Meals: "Tôi nhận được ít hơn 2 bữa ăn giao tận nhà mỗi ngày",
			Size: "Quy mô gia đình",
			Income: "Thu nhập hàng tháng của gia đình tôi ít hơn ",
			IncomeYear: "năm",
			Continue : "tiếp tục",
			CheckButton : "Xác Định Điều Kiện",
			LabelName : "Tên",
			FirstName : "Tên",
			LastName : "Họ",
			LabelHomePhone : "Nhà",
			LabelCellPhone : "Cầm tay",
			LabelNoPhone : "không có điện thoại",
			LabelEmail : "Địa Chỉ Thư Trên Mạng",
			LabelPhone : "Số điện thoại",
			CallTimeQuestion: "Khi nào gọi tiện lợi nhất?",
			CallTimeA : "9 giờ sáng – 12 giờ trưa thời gian",
			CallTimeB : "12 giờ trưa – 2 giờ trưa thời gian",
			CallTimeC : "2 giờ trưa – 5 giờ chiều thời gian",
			ContactLanguage : "Ngôn Ngữ Ưa Thích",
			LanguageOptions : [
				"English","廣東話","普通話","Español","Русский","Tagalog","Tiếng Việt"
			],
			FormSubmit : "Submit",
			InvalidPhone : "Vui lòng nhập số điện thoại hợp lệ (xxx-xxx-xxxx).",
			InvalidEmail : "Vui lòng nhập địa chỉ email hợp lệ (name@domain.com)."
		},
		NgnsText: {
			title : "Thực phẩm hàng hóa mỗi tuần",
			zero : "Không tìm thấy chi nhánh cung cấp dịch vụ thực phẩm hàng tuần cho mã bưu điện của quý vị. Xin vui lòng gọi số 211 để tìm chương trình thực phẩm khác và các dịch vụ trong khu vực của quý vị."
		},
		SfpsText: {
			title: "Thực phẩm hàng tháng",
			zero: "Không tìm thấy chi nhánh cung cấp dịch vụ thực phẩm hàng tháng cho mã bưu điện của quý khách. Xin vui lòng gọi số 211 để tìm chương trình thực phẩm khác và các dịch vụ trong khu vực của quý vị."
		},
		EfbsText: {
			title: "Lương thực khẩn cấp",
			zero: "Không tìm thấy chi nhánh cung cấp dịch vụ thực phẩm khẩn cấp cho mã bưu điện của quý vị. Xin vui lòng gọi số 211 để tìm chương trình thực phẩm khác và các dịch vụ trong khu vực quý vị."
		},
		HdgText: {
			title: "Giao Tận Nhà"
		},
		CfsText: {
			title: "Chương trình CalFresh"
		},
		HeadingText: {
			withzip	: {
				single	: "chi nhánh cung cấp dịch vụ cho mã bưu điện của quý vị và vùng lân cận",
				plural	: "những  chi nhánh cung cấp dịch vụ cho mã bưu điện của quý vị và vùng lân cận."
			},
			nozip	: {
				sf		: {
					single : "chi nhánh cung cấp dịch vụ cho Quận hạt San Francisco.",
					plural : "những chi nhánh cung cấp dịch vụ cho Quận hạt San Francisco."
				},
				marin	: {
					single : "chi nhánh cung cấp dịch vụ cho Quận hạt Marin.",
					plural : "những chi nhánh cung cấp dịch vụ cho Quận hạt Marin."
				}
			},
			noresults		: "Không tìm thấy chi nhánh cung cấp thực phẩm.",
			orderdefault	: "Các chi nhánh có chỗ trống sẽ được hiển trước, và thông tin sẽ được cập nhật trong suốt cả ngày.",
			orderuser		: "Thông tin sẽ được cập nhật trong suốt cả ngày.",
		},
		StatusLegend : [
			{
				title : "<span class='text-success'>Mở cho người đăng kí mới -</span>",
				definition : "Chi nhánh này có chỗ trống và yêu cầu điền đơn đăng ký có sẵn tại chi nhánh. Đơn đăng ký có thể cần đến hai tuần để xử lý.",
			},
			{
				title : "<span class='text-success'>Mở -</span>",
				definition : "Chi nhánh này có chỗ trống và không yêu cầu đăng ký. Chúng tôi khuyên quý khách nên mang một thẻ ID với địa chỉ hiện tại của quý vị.",
			},
			{
				title : "<span class='text-warning'>Chỉ nhận danh sách chờ đợi -</span>",
				definition : "Chi nhánh này hiện không có chỗ trống. Để tham gia vào danh sách chờ đợi, xin ghé qua chi nhánh trong thời gian đăng ký. Ngân Hàng Thực Phẩm sẽ thông báo cho quý khách khi có chỗ trống mở.",
			}
		],
		EnrollStatus : "Trạng thái",
		DistroNext : "Đợt Phân Phối Tiếp Theo",
		DistroDay : "Ngày Phân Phối",
		DistroTime : "Thời Gian Phân Phối",
		EnrollTime : "Thời Gian Đăng Ký",
		EnrollPattern : "Tần suất đăng ký",
		Closures : "Dự Kiến Đóng Cửa",
		LanguagesSpoken : "Ngôn Ngữ Bổ Sung",
		AdditionalInfo : "Thông Tin Thêm",
		Wheelchair : "<b>Lối Vào Cho Người Tàn Tật</b>",
		Lowcook : "<b>Thực đơn nấu tối thiểu:</b> Chi nhánh này có thực phẩm dành cho những người có thiết bị nấu tối thiểu và / hoặc kho lạnh.",
		ZipcodesServiced : "Mã Bưu Điện trong Vùng Phục Vụ",
		CalloutSenior : "Dành Cho Người Cao Tuổi Trên 60",
		CalloutSeniorDisabled : "Dành cho người cao tuổi trên 60 hoặc người lớn với khuyết tật",
		CalloutZip : "bên Ngoài Mã Bưu Điện Của Quý Khách",
		ContactPhone: "Số Điện Thoại Liên Lạc",
		Statuses: {
			open	: "Mở",
			wait	: "Chỉ Nhận Danh Sách Chờ Đ ợi",
			enroll	: "đăng ký mới"
		},
		EnrollPatterns: {
			1 : "Mỗi đợt phân phối",
			2 : "từ Thứ hai đến thứ sáu",
			3 : "đợt Phân phối đầu tiên mỗi tháng",
			4 : "Ghé chi nhánh để tìm hiểu thêm thông tin"
		},
		DayNames : {
			Monday		: "Thứ hai",
			Tuesday		: "Thứ ba",
			Wednesday	: "Thứ tư",
			Thursday	: "Thứ năm",
			Friday		: "Thứ sáu",
			Saturday	: "Thứ bảy",
			Sunday		: "Chủ nhật"
		},
		OrdinalNumbers: {
			1 : "Thứ nhất",
			2 : "Thứ nhì",
			3 : "Thứ ba",
			4 : "Thứ tư"
		},
		Messages : {
			MessageSuccess : "Tin Nhắn Đã Được Gửi!",
			MessageFailure : "Tin nhắn <u>không</u> được gửi",
			MessageSending : "Đang gửi...",
			ZipNotPattern : "Mã bưu điện quý vị điền vào ở ngoài khu vực phục vụ của Ngân Hàng Thực Phẩm SF-Marin. Vui lòng truy cập vào trang mạng <a href='http://www.cafoodbanks.org/find-food-assistance'>Hiệp Hội Các Ngân Hàng Thực Phẩm California</a> để xác định vị trí hỗ trợ lương thực gần nơi của quý vị. Nếu quý vị không thường trú tại California, vui lòng truy cập trang mạng <a href='http://www.feedingamerica.org/find-your-local-foodbank/'>Feeding America thực phẩm Mỹ</a>.",
			ZipNotFound	: "Mã Bưu Điện Nhập Vào Không Hợp Lệ"
		},
		Sort: {
			title	: "Loại theo trật tự",
			zip		: "Mã bưu điện",
			day		: "Ngày",
			timesort: "Giờ",
			reset	: "đặt lại"
		},
		AdditionalLanguages: {
			"392"	: "NGÔN NGỮ KÝ HIỆU MỸ",
			"384"	: "NGÔN NGỮ Ả RẬP",
			"387"	: "NGÔN NGỮ BENGAN",
			"375"	: "NGÔN NGỮ QUẢNG ĐÔNG",
			"383"	: "NGÔN NGỮ PHÁP",
			"382"	: "NGÔN NGỮ ĐỨC",
			"380"	: "NGÔN NGỮ NHẬT",
			"389"	: "NGÔN NGỮ KHỜ ME/CAM BU CHIA",
			"379"	: "NGÔN NGỮ HÀN",
			"391"	: "NGÔN NGỮ LÀO",
			"376"	: "NGÔN NGỮ HOA PHỔ THÔNG",
			"377"	: "NGÔN NGỮ NGA",
			"394"	: "NGÔN NGỮ SAMUA",
			"374"	: "NGÔN NGỮ TÂY BAN NHA",
			"378"	: "NGÔN NGỮ PHI LUẬT TÂN",
			"393"	: "NGÔN NGỮ ĐÀI SƠN",
			"385"	: "NGÔN NGỮ UA ĐU",
			"386"	: "NGÔN NGỮ VIỆT",
			"381"	: "NGÔN NGỮ WOLOF"
		}
	}
});
import { AfterViewInit, Component, OnInit, signal, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { PageTexts } from '../interfaces/interfaces';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, AfterViewInit {
  public showCookieBanner: boolean = false;
  public showAgbAccordion: boolean = false;

  // Hard Gate Init: Se inicializa en 'none' para ocultar el resto del sitio web
  public activeBranch: string = 'none';

  protected readonly title = signal('mpfilms');

  private readonly translations: { [key: string]: PageTexts } = {
    en: {
      nav_home: "Home", nav_exp_bodas: "Experience Weddings", nav_exp_studio: "Experience Studio", nav_about: "Vision", nav_packs: "Investment", nav_contact: "Contact",
      hero_sub: "Swiss Cinematic Legacy & Commercial Studio", hero_tag: "Where the unseen becomes unforgettable",
      btn_bodas: "EXPERIENCE WEDDINGS", btn_studio: "EXPERIENCE STUDIO",
      exp_tag: "Selected Works",
      about_tag: "My Vision",
      about_title: "Each film is a handcrafted legacy.",
      about_p1: "Some are impetuous and full of life, others quiet and deep – as authentic as the people I film.",
      about_p2: "There's laughter behind the lens as much as in front – and that’s exactly what moves me!",
      about_p3: "Because you don't want just any video, but a genuine and authentic cinematic story of your big day.",
      about_studio_tag: "Our Vision",
      about_studio_title: "Your Brand, Elevated.",
      about_studio_p1: "Behind every cinematic shot and every drone flight, there is a true alliance.",
      about_studio_p2: "As husband and wife and business partners, we merge technical precision with creative direction to ensure your space looks as majestic on screen as it does in real life.",
      about_studio_p3: "We are not just camera operators; we are the visual allies of your business.",
      inv_tag: "Exclusive Experience",
      inv_title: "Availability & Investment",
      inv_desc: "We accept a limited number of commissions per year across Switzerland, El Salvador and worldwide to guarantee handcrafted cinematic dedication.",
      inv_cta: "REQUEST PRIVATE DOSSIER",
      form_name: "NAME", form_email: "EMAIL", form_msg: "EVENT DETAILS", form_btn: "SEND REQUEST",
      form_select_placeholder: "WHICH STORY ARE WE TELLING?",
      form_opt_boda: "MY WEDDING (LEGACY)",
      form_opt_studio: "MY BUSINESS (COMMERCIAL)",
      footer_legal: "3457 Wasen im Emmental, SWITZERLAND | CENTRAL AMERICA",
      cookie_msg: "We use cookies to ensure the best cinematic experience.",
      cookie_btn: "ACCEPT",
      agb_title: "General Terms & Conditions (T&C)",
      agb_h1: "1. Scope", agb_p1: "These terms and conditions apply to all contracts between the videographer (private individual) and the client for videography services.",
      agb_h2: "2. Conclusion of contract", agb_p2: "A contract is concluded by written confirmation (email, messenger) or by acceptance of an offer.",
      agb_h3: "3. Services", agb_p3: "The scope of services results from the individual agreement. Changes after the conclusion may incur additional costs.",
      agb_h4: "4. Compensation", agb_p4: "Agreed compensation is due after invoicing. Short-term cancellations may incur cancellation fees.",
      agb_h5: "5. Copyright", agb_p5: "All content created is subject to copyright. Client receives simple usage rights for the agreed purpose. Commercial use requires written consent.",
      agb_h6: "6. Liability", agb_p6: "The videographer is only liable in case of intent or gross negligence. No liability for technical failures or force majeure.",
      agb_h7: "7. Privacy", agb_p7: "Personal data is treated confidentially and used exclusively for contract fulfillment.",
      agb_h8: "8. Applicable Law", agb_p8: "Swiss law applies. 3457 Wasen im Emmental, Switzerland. For Central American clients, mandatory local regulations also apply.",
      contact_whatsapp: "Direct WhatsApp"
    },
    es: {
      nav_home: "Inicio", nav_exp_bodas: "Experiencia Bodas", nav_exp_studio: "Experiencia Studio", nav_about: "Visión", nav_packs: "Inversión", nav_contact: "Contacto",
      hero_sub: "Cinematografía de Bodas & Estudio Comercial Suizo", hero_tag: "Donde lo invisible se vuelve inolvidable",
      btn_bodas: "EXPERIENCIA BODAS", btn_studio: "EXPERIENCIA STUDIO",
      exp_tag: "Trabajos Seleccionados",
      about_tag: "Mi Visión",
      about_title: "Cada película es un legado artesanal.",
      about_p1: "Algunas son impetuosas y llenas de vida, otras tranquilas y profundas – tan auténticas y vivas como las personas que filmo.",
      about_p2: "Hay risas detrás del lente como delante – ¡y justo eso me motiva!",
      about_p3: "Porque no quieres un video cualquiera, sino una historia cinematográfica de uno de los días más importantes de tu vida, genuina y auténtica.",
      about_studio_tag: "Nuestra Visión",
      about_studio_title: "Tu Marca, Elevada.",
      about_studio_p1: "Detrás de cada toma cinematográfica y cada vuelo de dron, hay una alianza.",
      about_studio_p2: "Como esposos y socios, unimos la precisión técnica con la dirección creativa para asegurarnos de que tu espacio se vea tan majestuoso en pantalla como en la vida real.",
      about_studio_p3: "No somos solo operadores de cámara; somos los aliados visuales de tu negocio.",
      inv_tag: "Experiencia Exclusiva",
      inv_title: "Disponibilidad e Inversión",
      inv_desc: "Aceptamos un número limitado de producciones por año en Suiza, El Salvador y destinos internacionales para asegurar una dedicación cinematográfica artesanal.",
      inv_cta: "SOLICITAR DOSSIER PRIVADO",
      form_name: "NOMBRE", form_email: "EMAIL", form_msg: "DETALLES DEL EVENTO O PROYECTO", form_btn: "ENVIAR SOLICITUD",
      form_select_placeholder: "¿QUÉ HISTORIA VAMOS A CONTAR?",
      form_opt_boda: "MI BODA (LEGACY)",
      form_opt_studio: "MI NEGOCIO (COMERCIAL)",
      footer_legal: "3457 Wasen im Emmental, SUIZA | CENTROAMÉRICA",
      cookie_msg: "Utilizamos cookies para asegurar la mejor experiencia cinematográfica.",
      cookie_btn: "ACEPTAR",
      agb_title: "Términos y Condiciones (T&C)",
      agb_h1: "1. Ámbito de aplicación", agb_p1: "Estos términos y condiciones generales se aplican a todos los contratos entre el videografo (persona privada) y el cliente para servicios de videografía.",
      agb_h2: "2. Conclusión del contrato", agb_p2: "Un contrato se concluye mediante confirmación por escrito (correo electrónico, mensajería) o mediante la aceptación de una oferta.",
      agb_h3: "3. Servicios", agb_p3: "El alcance de los servicios resulta del acuerdo individual. Las solicitudes de cambio después de la conclusión del contrato pueden incurrir en costos adicionales.",
      agb_h4: "4. Remuneración", agb_p4: "La remuneración acordada vence tras la facturación. En caso de cancelación a corto plazo, pueden surgir costos de cancelación.",
      agb_h5: "5. Derechos de autor", agb_p5: "Todo el contenido creado está sujeto a derechos de autor. El cliente recibe un derecho simple de uso para el propósito acordado. La transferencia o uso comercial requiere consentimiento por escrito.",
      agb_h6: "6. Responsabilidad", agb_p6: "El videografo solo es responsable en caso de dolo o negligencia grave. No se asume responsabilidad por fallas técnicas o fuerza mayor.",
      agb_h7: "7. Privacidad", agb_p7: "Los datos personales se tratan de forma confidencial y se utilizan exclusivamente para la ejecución del contrato.",
      agb_h8: "8. Ley aplicable", agb_p8: "Se aplica la ley suiza. 3457 Wasen im Emmental, Suiza. Para clientes de Centroamérica, se aplican adicionalmente las regulaciones locales obligatorias.",
      contact_whatsapp: "WhatsApp directo"
    },
    de: {
      nav_home: "Startseite", nav_exp_bodas: "Erlebnis Hochzeiten", nav_exp_studio: "Erlebnis Studio", nav_about: "Vision", nav_packs: "Investment", nav_contact: "Kontakt",
      hero_sub: "Schweizer Hochzeitsvideografie & Commercial Studio", hero_tag: "Wo das Unsichtbare unvergesslich wird",
      btn_bodas: "ERLEBNIS HOCHZEITEN", btn_studio: "ERLEBNIS STUDIO",
      exp_tag: "Ausgewählte Arbeiten",
      about_tag: "Meine Vision",
      about_title: "Jeder Film ist ein handgefertigtes Vermächtnis.",
      about_p1: "Manche sind temperamentvoll und voller Leben, andere ruhig und tiefgründig – so authentisch wie die Menschen, die ich filme.",
      about_p2: "Hinter der Kamera wird genauso viel gelacht wie davor – und genau das motiviert mich!",
      about_p3: "Denn du möchtest kein beliebiges Video, sondern eine echte filmische Geschichte deines grossen Tages.",
      about_studio_tag: "Unsere Vision",
      about_studio_title: "Deine Marke, auf einem neuen Level.",
      about_studio_p1: "Hinter jeder filmischen Aufnahme und jedem Drohnenflug steht eine Partnerschaft.",
      about_studio_p2: "Als Ehepaar und Geschäftspartner vereinen wir technische Präzision mit kreativer Regie, um sicherzustellen, dass deine Location auf dem Bildschirm genauso majestätisch wirkt wie im echten Leben.",
      about_studio_p3: "Wir sind nicht nur Kameraleute; wir sind die visuellen Verbündeten deines Unternehmens.",
      inv_tag: "Exklusive Erfahrung",
      inv_title: "Verfügbarkeit & Investment",
      inv_desc: "Wir nehmen eine begrenzte Anzahl von Projekten pro Jahr in der Schweiz, in El Salvador und weltweit an, um höchste filmische Qualität zu garantieren.",
      inv_cta: "PRIVATES DOSSIER ANFORDERN",
      form_name: "NAME", form_email: "E-MAIL", form_msg: "DETAILS ZUM EVENT ODER PROJEKT", form_btn: "ANFRAGE SENDEN",
      form_select_placeholder: "WELCHE GESCHICHTE ERZÄHLEN WIR?",
      form_opt_boda: "MEINE HOCHZEIT (LEGACY)",
      form_opt_studio: "MEIN UNTERNEHMEN (COMMERCIAL)",
      footer_legal: "3457 Wasen im Emmental, SCHWEIZ | ZENTRALAMERIKA",
      cookie_msg: "Wir verwenden Cookies, um Ihr Erlebnis zu verbessern.",
      cookie_btn: "AKZEPTIEREN",
      agb_title: "Allgemeine Geschäftsbedingungen (AGB)",
      agb_h1: "1. Geltungsbereich", agb_p1: "Diese Bedingungen gelten für alle Verträge zwischen dem Videografen (Privatperson) und dem Auftraggeber über videografische Dienstleistungen.",
      agb_h2: "2. Vertragsabschluss", agb_p2: "Ein Vertrag kommt durch schriftliche Bestätigung (E-Mail, Messenger) oder durch Annahme eines Angebots zustande.",
      agb_h3: "3. Leistungen", agb_p3: "Der Umfang ergibt sich aus der individuellen Vereinbarung. Änderungswünsche nach Abschluss können Zusatzkosten verursachen.",
      agb_h4: "4. Vergütung", agb_p4: "Die Vergütung ist nach Rechnungsstellung fällig. Bei kurzfristiger Absage können Ausfallkosten entstehen.",
      agb_h5: "5. Urheberrecht", agb_p5: "Erstellte Inhalte unterliegen dem Urheberrecht. Der Auftraggeber erhält einfache Nutzungsrechte. Gewerbliche Nutzung bedarf der Zustimmung.",
      agb_h6: "6. Haftung", agb_p6: "Haftung nur bei Vorsatz oder grober Fahrlässigkeit. Keine Haftung für technische Ausfälle oder höhere Gewalt.",
      agb_h7: "7. Datenschutz", agb_p7: "Daten werden vertraulich behandelt und ausschließlich zur Vertragsabwicklung verwendet.",
      agb_h8: "8. Recht", agb_p8: "Es gilt Schweizer Recht. 3457 Wasen im Emmental, Schweiz. Für Kunden aus Zentralamerika gelten lokale Vorschriften zusätzlich.",
      contact_whatsapp: "Direkt per WhatsApp"
    }
  };

  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const accepted = localStorage.getItem('cookies_accepted');
      this.showCookieBanner = !accepted;
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Default asegurado en Inglés
      const initialLang = localStorage.getItem('lang') || 'en';
      this.changeLanguage(initialLang);
    }
    this.initLazyLoading();
  }

  public toggleAgb(): void {
    this.showAgbAccordion = !this.showAgbAccordion;
  }

  public filterBranch(branch: string): void {
    this.activeBranch = branch;
  }

  public changeLanguage(lang: string) {
    document.documentElement.setAttribute('lang', lang);
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));

    const activeBtn = document.getElementById(`btn-${lang}`);
    if (activeBtn) activeBtn.classList.add('active');

    document.querySelectorAll('[data-i18n]').forEach((el: Element) => {
      const key = el.getAttribute('data-i18n');
      const htmlElement = el as HTMLElement;
      const property = key as keyof PageTexts;
      if (property && this.translations[lang] && this.translations[lang][property]) {
        htmlElement.innerText = this.translations[lang][property] as string;
      }
    });

    document.querySelectorAll('[data-i18n-holder]').forEach(el => {
      const key = el.getAttribute('data-i18n-holder');
      const htmlElement = el as HTMLInputElement;
      const property = key as keyof PageTexts;
      if (property && this.translations[lang] && this.translations[lang][property]) {
        htmlElement.placeholder = this.translations[lang][property] as string;
      }
    });

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lang', lang);
    }
  }

  public acceptCookies() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cookies_accepted', 'true');
    }
    this.showCookieBanner = false;
  }

  private initLazyLoading() {
    if (!isPlatformBrowser(this.platformId)) return;

    const iframes = document.querySelectorAll('iframe');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const iframe = entry.target as HTMLIFrameElement;
          const dataSrc = iframe.getAttribute('data-src');
          if (dataSrc) {
            iframe.setAttribute('src', dataSrc);
            iframe.removeAttribute('data-src');
          }
          observer.unobserve(iframe);
        }
      });
    }, { threshold: 0.25 });

    iframes.forEach(iframe => {
      const currentSrc = iframe.getAttribute('src');
      if (currentSrc && currentSrc !== '') {
        iframe.setAttribute('data-src', currentSrc);
        iframe.setAttribute('src', '');
        observer.observe(iframe);
      }
    });
  }
}

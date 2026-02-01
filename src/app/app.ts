import { AfterViewInit, Component, signal } from '@angular/core';
import { PageTexts } from '../interfaces/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  protected readonly title = signal('mpfilms');

  private readonly translations: { [key: string]: PageTexts } = {
    es: {
      nav_home: "Inicio", nav_exp: "Experiencia", nav_about: "Mi Visión", nav_packs: "Paquetes", nav_contact: "Contacto",
      hero_sub: "Cinematografía de Bodas", hero_tag: "Donde lo invisible se vuelve inolvidable",
      exp_tag: "Trabajos Seleccionados", about_tag: "Mi Visión",
      about_title: "Cada película es un legado artesanal.",
      about_p1: "Algunas son impetuosas y llenas de vida, otras tranquilas y profundas – tan auténticas y vivas como las personas que filmo.",
      about_p2: "Hay risas detrás del lente como delante – ¡y justo eso me motiva!",
      about_p3: "Porque no quieres un video cualquiera, sino una historia cinematográfica de uno de los días más importantes de tu vida, genuina y auténtica.",
      pack1_name: "Paquete Base", pack2_name: "Extras",
      pack_btn: "CONSULTAR", pack_book: "RESERVAR AHORA", pack_custom: "Personaliza tu experiencia",
      pack1_d1: "Lo que está incluido", pack1_d2: "8 Horas de Cobertura", pack1_d3: "Dron en 4K (sujeto a clima y permisos)",
      pack1_d4: "Grabación e integración de voces", pack1_d5: "Edición", pack1_d6: "Trailer de 60 seg",
      pack1_d7: "Instagram Reel", pack1_d8: "6 min. Highlights de la boda", pack1_d9: "Entrega",
      pack1_d10: "Highlights de la boda (en el transcurso de 3 meses)", pack1_d11: "Instagram Reel (en el transcurso de 7 días)", pack1_d12: "Trailer (en el transcurso de 72 horas)", pack1_d13: "Entrega en USB",
      pack2_d1: "Horas extras de cobertura CHF 150.-/hora", pack2_d2: "Extra Highlights en la película de la boda CHF 100.-/min",
      pack2_d3: "Sesión pre-boda CHF 150.-/hora", pack2_d4: "Consúltanos por paquetes personalizados y ofertas especiales",
      form_name: "NOMBRE", form_email: "EMAIL", form_msg: "DETALLES DEL EVENTO", form_btn: "ENVIAR SOLICITUD",
      footer_legal: "3454 SUMISWALD, SUIZA | CENTROAMÉRICA",
      cookie_msg: "Utilizamos cookies para asegurar la mejor experiencia cinematográfica.",
      cookie_btn: "ACEPTAR",
      agb_title: "Términos y Condiciones (AGB)",
      agb_h1: "1. Ámbito de aplicación", agb_p1: "Estos términos y condiciones generales se aplican a todos los contratos entre el videografo (persona privada) y el cliente para servicios de videografía.",
      agb_h2: "2. Conclusión del contrato", agb_p2: "Un contrato se concluye mediante confirmación por escrito (correo electrónico, mensajería) o mediante la aceptación de una oferta.",
      agb_h3: "3. Servicios", agb_p3: "El alcance de los servicios resulta del acuerdo individual. Las solicitudes de cambio después de la conclusión del contrato pueden incurrir en costos adicionales.",
      agb_h4: "4. Remuneración", agb_p4: "La remuneración acordada vence tras la facturación. En caso de cancelación a corto plazo, pueden surgir costos de cancelación.",
      agb_h5: "5. Derechos de autor", agb_p5: "Todo el contenido creado está sujeto a derechos de autor. El cliente recibe un derecho simple de uso para el propósito acordado. La transferencia o uso comercial requiere consentimiento por escrito.",
      agb_h6: "6. Responsabilidad", agb_p6: "El videografo solo es responsable en caso de dolo o negligencia grave. No se asume responsabilidad por fallas técnicas o fuerza mayor.",
      agb_h7: "7. Privacidad", agb_p7: "Los datos personales se tratan de forma confidencial y se utilizan exclusivamente para la ejecución del contrato.",
      agb_h8: "8. Ley aplicable", agb_p8: "Se aplica la ley suiza. 3454 Sumiswald, Suiza. Para clientes de Centroamérica, se aplican adicionalmente las regulaciones locales obligatorias.",
      contact_whatsapp: "WhatsApp directo",
    },
    en: {
      nav_home: "Home", nav_exp: "Experience", nav_about: "My Vision", nav_packs: "Packages", nav_contact: "Contact",
      hero_sub: "Wedding Cinematography", hero_tag: "Where the unseen becomes unforgettable",
      exp_tag: "Selected Works", about_tag: "My Vision",
      about_title: "Each film is a handcrafted legacy.",
      about_p1: "Some are impetuous and full of life, others quiet and deep – as authentic as the people I film.",
      about_p2: "There's laughter behind the lens as much as in front – and that’s exactly what moves me!",
      about_p3: "Because you don't want just any video, but a genuine and authentic cinematic story of your big day.",
      pack1_name: "Base Package", pack2_name: "Add-ons",
      pack_btn: "INQUIRE", pack_book: "BOOK NOW", pack_custom: "Customize your experience",
      pack1_d1: "What's included", pack1_d2: "8 Hours of Coverage", pack1_d3: "4K Drone (subject to weather and permits)",
      pack1_d4: "Voice recording and integration", pack1_d5: "Editing", pack1_d6: "60s Wedding Trailer",
      pack1_d7: "Instagram Reel", pack1_d8: "6 min. Wedding Highlights", pack1_d9: "Delivery",
      pack1_d10: "Wedding Highlights (within 3 months)", pack1_d11: "Instagram Reel (within 7 days)", pack1_d12: "Trailer (within 72 hours)", pack1_d13: "Delivery on USB",
      pack2_d1: "Extra hours of coverage CHF 150.-/hour", pack2_d2: "Extra Highlights in the wedding film CHF 100.-/min.",
      pack2_d3: "Pre-wedding session CHF 150.-/hour", pack2_d4: "Contact us for custom packages and special offers",
      form_name: "NAME", form_email: "EMAIL", form_msg: "EVENT DETAILS", form_btn: "SEND REQUEST",
      footer_legal: "3454 SUMISWALD, SWITZERLAND | CENTRAL AMERICA",
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
      agb_h8: "8. Applicable Law", agb_p8: "Swiss law applies. 3454 Sumiswald, Switzerland. For Central American clients, mandatory local regulations also apply.",
      contact_whatsapp: "Direct WhatsApp"
    },
    de: {
      nav_home: "Startseite", nav_exp: "Portfolio", nav_about: "Meine Vision", nav_packs: "Pakete", nav_contact: "Kontakt",
      hero_sub: "Hochzeitsvideografie", hero_tag: "Wo das Unsichtbare unvergesslich wird",
      exp_tag: "Ausgewählte Arbeiten", about_tag: "Meine Vision",
      about_title: "Jeder Film ist ein handgefertigtes Vermächtnis.",
      about_p1: "Manche sind temperamentvoll und voller Leben, andere ruhig und tiefgründig – so authentisch wie die Menschen, die ich filme.",
      about_p2: "Hinter der Kamera wird genauso viel gelacht wie davor – und genau das motiviert mich!",
      about_p3: "Denn du möchtest kein beliebiges Video, sondern eine echte filmische Geschichte deines grossen Tages.",
      pack1_name: "Basispaket", pack2_name: "Extras",
      pack_btn: "ANFRAGEN", pack_book: "JETZT BUCHEN", pack_custom: "Personalisiere dein Erlebnis",
      pack1_d1: "Was enthalten ist", pack1_d2: "8 Stunden Begleitung", pack1_d3: "Drohneaufnahmen in 4K (abhängig vom Wetter und der Erlaubnis)",
      pack1_d4: "Tonaufnahmen und Integration von Stimmen", pack1_d5: "Schnitt und Bearbeitung", pack1_d6: "60s Trailer",
      pack1_d7: "Instagram Reel", pack1_d8: "6 Min. Hochzeits-Highlights", pack1_d9: "Lieferung",
      pack1_d10: "Hochzeits-Highlights (innerhalb von 3 Monaten)", pack1_d11: "Instagram Reel (innerhalb von 7 Tagen)", pack1_d12: "Trailer (innerhalb von 72 Stunden)", pack1_d13: "Übergabe als USB-Stick",
      pack2_d1: "Zusätzliche Stunden CHF 150.-/Std", pack2_d2: "Zusätzliche Hochzeits-Highlights im Film CHF 100.-/Std",
      pack2_d3: "Pre-Wedding Shooting CHF 150.-/Std", pack2_d4: "Kontaktiere uns für individuelle Pakete und spezielle Angebote",
      form_name: "NAME", form_email: "E-MAIL", form_msg: "DETAILS ZUM EVENT", form_btn: "ANFRAGE SENDEN",
      footer_legal: "3454 SUMISWALD, SCHWEIZ | ZENTRALAMERIKA",
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
      agb_h8: "8. Recht", agb_p8: "Es gilt Schweizer Recht. 3454 Sumiswald, Schweiz. Für Kunden aus Zentralamerika gelten lokale Vorschriften zusätzlich.",
      contact_whatsapp: "Direkt per WhatsApp"
    }
  };

  public ngAfterViewInit() {
    this.changeLanguage(localStorage.getItem('lang') || 'de');
    if (localStorage.getItem('cookies_accepted')) {
      document.getElementById('cookie-banner')?.classList.add('hidden');
    } else {
      document.getElementById('cookie-banner')?.classList.remove('hidden');
    }
  }

  protected changeLanguage(lang: string) {
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.getElementById(`btn-${lang}`);
    if (activeBtn) activeBtn.classList.add('active');

    document.querySelectorAll('[data-i18n]').forEach((el: Element) => {
      const key = el.getAttribute('data-i18n');
      const htmlElement = el as HTMLElement;
      const property: keyof PageTexts = key as keyof PageTexts;
      if (property !== null && this.translations[lang] && this.translations[lang][property]) htmlElement.innerText = this.translations[lang][property];
    });

    document.querySelectorAll('[data-i18n-holder]').forEach(el => {
      const key = el.getAttribute('data-i18n-holder');
      const htmlElement = el as HTMLInputElement;
      const property: keyof PageTexts = key as keyof PageTexts;
      if (property !== null && this.translations[lang] && this.translations[lang][property]) htmlElement.placeholder = this.translations[lang][property];
    });

    localStorage.setItem('lang', lang);
  }

  protected acceptCookies() {
    localStorage.setItem('cookies_accepted', 'true');
    document.getElementById('cookie-banner')?.classList.add('hidden');
  }
}

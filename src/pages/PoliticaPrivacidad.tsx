import { Link } from "react-router-dom";
import LegalPageLayout from "@/components/legal/LegalPageLayout";

export default function PoliticaPrivacidad() {
  return (
    <LegalPageLayout
      title="Política de Privacidad"
      description="Información sobre el tratamiento de datos personales y los derechos de las personas usuarias."
      path="/privacidad"
    >
      <section>
        <h2>Quién es responsable del tratamiento</h2>
        <p>
          El responsable del tratamiento es ECOLOGÍA RENTABLE, S.L., NIF B10983740, con domicilio social
          en Calle Fuerteventura, 4, Bajo, 28703 San Sebastián de los Reyes (Madrid), correo electrónico
          info@ecologiarentable.es y teléfono +34 605 928 626.
        </p>
        <p>
          Inscrita en el Registro Mercantil de Madrid, Tomo 43953, Folio 1, Sección 8, Hoja M-775421,
          inscripción 1ª de 12 de agosto de 2022. Administradora única: Camelia Hakimi Ibnoulkhatib.
        </p>
      </section>
      <section>
        <h2>Qué datos tratamos y para qué</h2>
        <p>
          Tratamos los datos enviados mediante cinco vías: el formulario de Contacto, el formulario de
          Hazte Socio, el formulario de solicitud de pedido de la tienda, el formulario de solicitud de
          presupuesto de las páginas de servicio y los comentarios publicados en el blog. Estos formularios
          pueden recoger nombre, correo electrónico, teléfono opcional, empresa opcional, provincia y código
          postal opcionales y un comentario libre. En los comentarios del blog, el nombre y el comentario se
          publican tras moderación; el correo electrónico nunca se publica.
        </p>
        <p>
          Usamos estos datos para responder a la solicitud y preparar un presupuesto. La base jurídica del
          envío y la primera respuesta es el consentimiento de la persona interesada. La gestión posterior
          de la relación comercial se basa en nuestro interés legítimo.
        </p>
      </section>
      <section>
        <h2>Durante cuánto tiempo guardamos tus datos</h2>
        <p>
          Conservamos los datos durante el tiempo necesario para atender la solicitud y, después, durante
          los plazos legales de prescripción aplicables. Los datos comerciales se conservan durante un
          máximo de tres años desde el último contacto.
        </p>
      </section>
      <section>
        <h2>Con quién compartimos tus datos</h2>
        <p>
          Utilizamos Supabase como prestador de alojamiento y base de datos, con servidores en la Unión
          Europea, y Google como prestador de analítica. Las transferencias internacionales de Google a
          Estados Unidos están amparadas por el Data Privacy Framework y por cláusulas contractuales tipo.
          No cedemos tus datos a otros terceros salvo obligación legal.
        </p>
      </section>
      <section>
        <h2>Cuáles son tus derechos</h2>
        <p>
          Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación y
          portabilidad escribiendo a info@ecologiarentable.es. Cuando el tratamiento se base en tu
          consentimiento, puedes retirarlo en cualquier momento, sin que ello afecte a la licitud del
          tratamiento basado en el consentimiento previo a su retirada (artículo 13.2.c del RGPD). También puedes presentar una reclamación
          ante la Agencia Española de Protección de Datos en{" "}
          <a href="https://www.aepd.es" target="_blank" rel="noreferrer">www.aepd.es</a>.
        </p>
      </section>
      <section>
        <h2>Cómo usamos las cookies</h2>
        <p>
          La información sobre cookies técnicas y analíticas, sus plazos y la forma de cambiar tu decisión
          está disponible en nuestra <Link to="/cookies">Política de Cookies</Link>.
        </p>
      </section>
    </LegalPageLayout>
  );
}
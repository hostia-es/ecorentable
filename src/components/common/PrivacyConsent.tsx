import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";

interface PrivacyConsentProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  id: string;
}

export default function PrivacyConsent({ checked, onCheckedChange, id }: PrivacyConsentProps) {
  return (
    <div className="space-y-2 rounded-md border border-border bg-muted/40 p-4">
      <div className="flex items-start gap-3">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={(value) => onCheckedChange(value === true)}
          aria-required="true"
        />
        <label htmlFor={id} className="text-sm leading-relaxed text-foreground cursor-pointer">
          He leído y acepto la{" "}
          <Link to="/privacidad" className="font-semibold text-primary underline underline-offset-2">
            Política de Privacidad
          </Link>
          .
        </label>
      </div>
      <p className="pl-7 text-xs leading-relaxed text-muted-foreground">
        Responsable: ECOLOGÍA RENTABLE, S.L. Finalidad: atender tu solicitud. Base jurídica:
        consentimiento. No cedemos datos a terceros salvo obligación legal. Puedes ejercer tus
        derechos de acceso, rectificación y supresión escribiendo a info@ecologiarentable.es. Consulta
        la{" "}
        <Link to="/privacidad" className="font-medium text-primary underline underline-offset-2">
          información adicional en la Política de Privacidad
        </Link>
        .
      </p>
    </div>
  );
}
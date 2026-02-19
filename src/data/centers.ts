export interface Center {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  services: string[];
  province: string;
  city: string;
}

const servicesList = {
  descarb: "Descarbonización",
  dpf: "Limpieza DPF/FAP",
  egr: "Limpieza EGR",
  cat: "Limpieza Catalizador",
  itv: "Reducción gases ITV",
};

export const centersByProvince: Record<string, Center[]> = {
  madrid: [
    { id: "m1", name: "Taller AutoEco Madrid Centro", address: "Calle Gran Vía 45, 28013 Madrid", phone: "+34 91 123 4567", hours: "Lun–Vie 8:00–19:00, Sáb 9:00–14:00", services: ["Descarbonización", "Limpieza DPF/FAP", "Limpieza EGR", "Reducción gases ITV"], province: "madrid", city: "Madrid" },
    { id: "m2", name: "Motor Verde Vallecas", address: "Av. de la Albufera 120, 28038 Madrid", phone: "+34 91 234 5678", hours: "Lun–Vie 8:30–18:30", services: ["Descarbonización", "Limpieza DPF/FAP", "Limpieza Catalizador"], province: "madrid", city: "Madrid" },
    { id: "m3", name: "EcoTaller Majadahonda", address: "C/ Barajas 8, 28220 Majadahonda", phone: "+34 91 345 6789", hours: "Lun–Sáb 9:00–18:00", services: ["Descarbonización", "Limpieza EGR", "Reducción gases ITV"], province: "madrid", city: "Majadahonda" },
    { id: "m4", name: "Automecánica Verde Alcalá", address: "Ctra. Nacional II km 32, 28806 Alcalá de Henares", phone: "+34 91 456 7890", hours: "Lun–Vie 8:00–19:00", services: ["Descarbonización", "Limpieza DPF/FAP", "Limpieza EGR", "Limpieza Catalizador"], province: "madrid", city: "Alcalá de Henares" },
    { id: "m5", name: "Taller EcoFlota Getafe", address: "Polígono Industrial Los Olivos, Getafe", phone: "+34 91 567 8901", hours: "Lun–Vie 7:30–18:00", services: ["Descarbonización", "Limpieza DPF/FAP", "Reducción gases ITV"], province: "madrid", city: "Getafe" },
    { id: "m6", name: "Diésel Ecológico Leganés", address: "C/ Industria 34, 28914 Leganés", phone: "+34 91 678 9012", hours: "Lun–Vie 8:00–18:30, Sáb 9:00–13:00", services: ["Descarbonización", "Limpieza EGR", "Limpieza Catalizador"], province: "madrid", city: "Leganés" },
    { id: "m7", name: "AutoVerde Móstoles", address: "Av. de Portugal 22, 28935 Móstoles", phone: "+34 91 789 0123", hours: "Lun–Sáb 8:00–18:00", services: ["Descarbonización", "Limpieza DPF/FAP", "Limpieza EGR"], province: "madrid", city: "Móstoles" },
    { id: "m8", name: "CleanEngine Pozuelo", address: "C/ España 5, 28224 Pozuelo de Alarcón", phone: "+34 91 890 1234", hours: "Lun–Vie 9:00–19:00", services: ["Descarbonización", "Reducción gases ITV", "Limpieza Catalizador"], province: "madrid", city: "Pozuelo de Alarcón" },
  ],
  barcelona: [
    { id: "b1", name: "EcoMotor Barcelona L'Eixample", address: "Carrer de Mallorca 234, 08008 Barcelona", phone: "+34 93 123 4567", hours: "Lun–Vie 8:00–19:00, Sáb 9:00–14:00", services: ["Descarbonización", "Limpieza DPF/FAP", "Limpieza EGR", "Reducción gases ITV"], province: "barcelona", city: "Barcelona" },
    { id: "b2", name: "Taller Verde Gràcia", address: "Carrer Gran de Gràcia 89, 08012 Barcelona", phone: "+34 93 234 5678", hours: "Lun–Vie 8:30–18:30", services: ["Descarbonización", "Limpieza DPF/FAP", "Limpieza Catalizador"], province: "barcelona", city: "Barcelona" },
    { id: "b3", name: "AutoEco Hospitalet", address: "Av. Carrilet 56, 08902 Hospitalet de Llobregat", phone: "+34 93 345 6789", hours: "Lun–Sáb 8:00–18:00", services: ["Descarbonización", "Limpieza EGR", "Limpieza DPF/FAP"], province: "barcelona", city: "Hospitalet de Llobregat" },
    { id: "b4", name: "Mecànica Ecològica Badalona", address: "C/ Ponent 34, 08911 Badalona", phone: "+34 93 456 7890", hours: "Lun–Vie 8:00–18:30", services: ["Descarbonización", "Reducción gases ITV", "Limpieza Catalizador"], province: "barcelona", city: "Badalona" },
    { id: "b5", name: "FlotaVerde Cornellà", address: "Polígon Can Roca, 08940 Cornellà", phone: "+34 93 567 8901", hours: "Lun–Vie 7:30–18:00", services: ["Descarbonización", "Limpieza DPF/FAP", "Limpieza EGR"], province: "barcelona", city: "Cornellà" },
    { id: "b6", name: "Diésel Net Sabadell", address: "Av. Matadepera 120, 08205 Sabadell", phone: "+34 93 678 9012", hours: "Lun–Vie 8:00–18:30, Sáb 9:00–13:00", services: ["Descarbonización", "Limpieza EGR", "Reducción gases ITV"], province: "barcelona", city: "Sabadell" },
    { id: "b7", name: "CleanDPF Terrassa", address: "C/ Vapor Llonch 12, 08221 Terrassa", phone: "+34 93 789 0123", hours: "Lun–Vie 8:00–19:00", services: ["Descarbonización", "Limpieza DPF/FAP", "Limpieza Catalizador"], province: "barcelona", city: "Terrassa" },
    { id: "b8", name: "AutoEco Sant Cugat", address: "C/ Volpelleres 7, 08190 Sant Cugat del Vallès", phone: "+34 93 890 1234", hours: "Lun–Vie 9:00–18:30", services: ["Descarbonización", "Limpieza EGR", "Reducción gases ITV"], province: "barcelona", city: "Sant Cugat del Vallès" },
  ],
  valencia: [
    { id: "v1", name: "EcoTaller Valencia Ciudad", address: "Av. del Cid 45, 46018 Valencia", phone: "+34 96 123 4567", hours: "Lun–Vie 8:00–19:00, Sáb 9:00–14:00", services: ["Descarbonización", "Limpieza DPF/FAP", "Limpieza EGR", "Reducción gases ITV"], province: "valencia", city: "Valencia" },
    { id: "v2", name: "Motor Verde Patraix", address: "C/ Arquitecto Tolsa 23, 46019 Valencia", phone: "+34 96 234 5678", hours: "Lun–Vie 8:30–18:30", services: ["Descarbonización", "Limpieza DPF/FAP"], province: "valencia", city: "Valencia" },
    { id: "v3", name: "AutoEco Torrent", address: "C/ Major 78, 46900 Torrent", phone: "+34 96 345 6789", hours: "Lun–Sáb 8:00–18:00", services: ["Descarbonización", "Limpieza EGR", "Reducción gases ITV"], province: "valencia", city: "Torrent" },
    { id: "v4", name: "DiéselClean Gandía", address: "Polígon Les Foies, 46700 Gandía", phone: "+34 96 456 7890", hours: "Lun–Vie 8:00–18:30", services: ["Descarbonización", "Limpieza DPF/FAP", "Limpieza Catalizador"], province: "valencia", city: "Gandía" },
    { id: "v5", name: "TallerEco Alzira", address: "Av. País Valencià 34, 46600 Alzira", phone: "+34 96 567 8901", hours: "Lun–Vie 7:30–18:00", services: ["Descarbonización", "Limpieza EGR", "Reducción gases ITV"], province: "valencia", city: "Alzira" },
    { id: "v6", name: "Verde Motor Sagunto", address: "C/ Julio Antonio 5, 46500 Sagunto", phone: "+34 96 678 9012", hours: "Lun–Vie 8:00–18:30", services: ["Descarbonización", "Limpieza DPF/FAP"], province: "valencia", city: "Sagunto" },
  ],
  sevilla: [
    { id: "s1", name: "EcoMotor Sevilla Triana", address: "C/ Betis 34, 41010 Sevilla", phone: "+34 95 123 4567", hours: "Lun–Vie 8:00–19:00, Sáb 9:00–14:00", services: ["Descarbonización", "Limpieza DPF/FAP", "Limpieza EGR", "Reducción gases ITV"], province: "sevilla", city: "Sevilla" },
    { id: "s2", name: "AutoVerde Sur Dos Hermanas", address: "Polígon El Pino, 41702 Dos Hermanas", phone: "+34 95 234 5678", hours: "Lun–Vie 8:30–18:30", services: ["Descarbonización", "Limpieza DPF/FAP"], province: "sevilla", city: "Dos Hermanas" },
    { id: "s3", name: "DiéselEco Alcalá Guadaíra", address: "Polígon Andalucía, 41500 Alcalá de Guadaíra", phone: "+34 95 345 6789", hours: "Lun–Sáb 8:00–18:00", services: ["Descarbonización", "Limpieza EGR", "Limpieza Catalizador"], province: "sevilla", city: "Alcalá de Guadaíra" },
    { id: "s4", name: "TallerEco Mairena", address: "C/ Real 12, 41927 Mairena del Aljarafe", phone: "+34 95 456 7890", hours: "Lun–Vie 8:00–18:30", services: ["Descarbonización", "Limpieza DPF/FAP", "Reducción gases ITV"], province: "sevilla", city: "Mairena del Aljarafe" },
    { id: "s5", name: "CleanDiesel Utrera", address: "Av. Europa 56, 41710 Utrera", phone: "+34 95 567 8901", hours: "Lun–Vie 7:30–18:00", services: ["Descarbonización", "Limpieza EGR"], province: "sevilla", city: "Utrera" },
    { id: "s6", name: "AutoEco Camas", address: "C/ Industria 23, 41900 Camas", phone: "+34 95 678 9012", hours: "Lun–Vie 8:00–18:30", services: ["Descarbonización", "Limpieza DPF/FAP", "Limpieza Catalizador"], province: "sevilla", city: "Camas" },
  ],
  malaga: [
    { id: "ma1", name: "EcoMotor Málaga Centro", address: "C/ Cuarteles 34, 29002 Málaga", phone: "+34 95 223 4567", hours: "Lun–Vie 8:00–19:00, Sáb 9:00–14:00", services: ["Descarbonización", "Limpieza DPF/FAP", "Limpieza EGR", "Reducción gases ITV"], province: "malaga", city: "Málaga" },
    { id: "ma2", name: "TallerVerde Marbella", address: "Polígon Industrial El Ángel, 29600 Marbella", phone: "+34 95 234 5678", hours: "Lun–Vie 8:30–18:30", services: ["Descarbonización", "Limpieza DPF/FAP"], province: "malaga", city: "Marbella" },
    { id: "ma3", name: "AutoEco Fuengirola", address: "C/ Miguel de Cervantes 8, 29640 Fuengirola", phone: "+34 95 345 6789", hours: "Lun–Sáb 8:00–18:00", services: ["Descarbonización", "Limpieza EGR", "Reducción gases ITV"], province: "malaga", city: "Fuengirola" },
    { id: "ma4", name: "DiéselNet Torremolinos", address: "Av. Palma de Mallorca 45, 29620 Torremolinos", phone: "+34 95 456 7890", hours: "Lun–Vie 8:00–18:30", services: ["Descarbonización", "Limpieza DPF/FAP", "Limpieza Catalizador"], province: "malaga", city: "Torremolinos" },
    { id: "ma5", name: "CleanMotor Vélez-Málaga", address: "Polígon Vélez, 29700 Vélez-Málaga", phone: "+34 95 567 8901", hours: "Lun–Vie 7:30–18:00", services: ["Descarbonización", "Limpieza EGR"], province: "malaga", city: "Vélez-Málaga" },
    { id: "ma6", name: "EcoTaller Antequera", address: "Polígon Industrial, 29200 Antequera", phone: "+34 95 678 9012", hours: "Lun–Vie 8:00–18:30", services: ["Descarbonización", "Limpieza DPF/FAP", "Reducción gases ITV"], province: "malaga", city: "Antequera" },
  ],
};

export const provinceInfo: Record<string, { name: string; description: string; slug: string }> = {
  madrid: { name: "Madrid", description: "Capital y área metropolitana — más de 80 centros certificados en la Comunidad de Madrid.", slug: "madrid" },
  barcelona: { name: "Barcelona", description: "Cataluña y área de Barcelona — red amplia de talleres especializados en DPF y descarbonización.", slug: "barcelona" },
  valencia: { name: "Valencia", description: "Comunitat Valenciana — talleres certificados en Valencia, Alicante y Castellón.", slug: "valencia" },
  sevilla: { name: "Sevilla", description: "Andalucía occidental — cobertura en Sevilla capital y principales municipios del área metropolitana.", slug: "sevilla" },
  malaga: { name: "Málaga", description: "Costa del Sol y serranía — red de talleres desde Málaga capital hasta la costa.", slug: "malaga" },
};

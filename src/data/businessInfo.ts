export const BUSINESS_INFO = {
  name: 'Success Computech',
  phone: '7373188844',
  displayPhone: '+91 73731 88844',
  whatsappUrl: 'https://wa.me/917373188844?text=Hello%20Success%20Computech,%20I%20need%20assistance%20with%20citizen%20services.',
  whatsappDocsUrl: (serviceName?: string) =>
    `https://wa.me/917373188844?text=Hello%20Success%20Computech,%20I%20want%20to%20apply%20for%20${encodeURIComponent(
      serviceName || 'online service'
    )}.%20Please%20guide%20me%20on%20what%20documents%20to%20send.`,
  whatsappApplicationQueryUrl: (refNo: string, clientName: string) =>
    `https://wa.me/917373188844?text=${encodeURIComponent(
      `வணக்கம் சக்சஸ் கம்ப்யூடெக், எனது விண்ணப்ப எண்: ${refNo} (${clientName}) நிலவரம் பற்றி அறிய விரும்புகிறேன்.`
    )}`,
  address: '15/17 Opp AK Motors, PN Road, Tirupur - 641602',
  street: '15/17, PN Road',
  landmark: 'Opposite AK Motors',
  city: 'Tirupur',
  pincode: '641602',
  state: 'Tamil Nadu',
  establishedYear: '2020',
  workingHours: 'Monday - Saturday: 9:00 AM to 8:30 PM (Sunday: 10:00 AM to 2:00 PM)',
  email: 's7373188844@gmail.com',
  mapDirectionsUrl: 'https://www.google.com/maps/search/?api=1&query=15/17+Opp+AK+Motors+PN+Road+Tirupur+641602'
};

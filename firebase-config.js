/* Zukko Kimyo — Firebase sozlamalari.
 * Firebase Console → Project settings → Your apps → Web app → "SDK setup and configuration" (Config)
 * dagi qiymatlarni quyiga ko'chiring. Bo'sh qoldirilsa, sayt loginsiz (ochiq) ishlaydi.
 */
window.ZK_CONFIG = {
  firebase: {
    apiKey: 'AIzaSyDlCTOQDxFZvk3FGDHuTIULTswLqK0avIk',
    authDomain: 'zukko-kimyo.firebaseapp.com',
    projectId: 'zukko-kimyo',
    storageBucket: 'zukko-kimyo.firebasestorage.app',
    messagingSenderId: '11044770746',
    appId: '1:11044770746:web:1af5e3d5ce856cff3b0383',
  },
  // O'quvchi logini shu domen bilan "email"ga aylanadi (ali.7a -> ali.7a@zukko-kimyo.uz). Xat yuborilmaydi.
  // firestore.rules dagi ADMIN email ham shu domen bilan bir xil bo'lishi kerak.
  loginDomain: 'zukko-kimyo.uz',
};

export interface FlutterFile {
  path: string;
  name: string;
  content: string;
  language: string;
}

export const flutterCodebase: Record<string, FlutterFile> = {
  "pubspec.yaml": {
    path: "pubspec.yaml",
    name: "pubspec.yaml",
    language: "yaml",
    content: `name: gamer_alerta
description: O aplicativo definitivo para notícias, promoções, jogos gratuitos e alertas sobre videogames.
version: 1.0.0+1

environment:
  sdk: ">=3.0.0 <4.0.0"

dependencies:
  flutter:
    sdk: flutter

  # Firebase Suite
  firebase_core: ^2.27.0
  firebase_auth: ^4.17.8
  cloud_firestore: ^4.15.8
  firebase_messaging: ^14.7.19
  firebase_storage: ^11.6.9

  # State Management & DI
  provider: ^6.1.2

  # Networking & Helpers
  http: ^1.2.0
  cached_network_image: ^3.3.1
  url_launcher: ^6.2.5
  shared_preferences: ^2.2.2
  flutter_local_notifications: ^16.3.1
  intl: ^0.19.0

  # UI Design
  flutter_svg: ^2.0.10
  google_fonts: ^6.1.0
  shimmer: ^3.0.0
  animate_do: ^3.1.2

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.1

flutter:
  uses-material-design: true
  assets:
    - assets/images/
    - assets/icons/
`
  },
  "lib/main.dart": {
    path: "lib/main.dart",
    name: "main.dart",
    language: "dart",
    content: `import 'package:flutter/material';
import 'package:firebase_core/firebase_core.dart';
import 'package:provider/provider.dart';
import 'package:gamer_alerta/utils/theme.dart';
import 'package:gamer_alerta/providers/auth_provider.dart';
import 'package:gamer_alerta/providers/theme_provider.dart';
import 'package:gamer_alerta/providers/deals_provider.dart';
import 'package:gamer_alerta/providers/news_provider.dart';
import 'package:gamer_alerta/screens/splash_screen.dart';
import 'package:gamer_alerta/services/notification_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Inicialização do Firebase
  await Firebase.initializeApp();
  
  // Inicialização do Serviço de Notificações
  final notificationService = NotificationService();
  await notificationService.initialize();

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => ThemeProvider()),
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => DealsProvider()),
        ChangeNotifierProvider(create: (_) => NewsProvider()),
      ],
      child: const GamerAlertaApp(),
    ),
  );
}

class GamerAlertaApp extends StatelessWidget {
  const GamerAlertaApp({super.key});

  @override
  Widget build(BuildContext context) {
    final themeProvider = Provider.of<ThemeProvider>(context);
    
    return MaterialApp(
      title: 'Gamer Alerta',
      debugShowCheckedModeBanner: false,
      themeMode: themeProvider.themeMode,
      theme: GamerAlertaTheme.lightTheme,
      darkTheme: GamerAlertaTheme.darkTheme,
      home: const SplashScreen(),
    );
  }
}
`
  },
  "lib/models/game_deal.dart": {
    path: "lib/models/game_deal.dart",
    name: "game_deal.dart",
    language: "dart",
    content: `class GameDeal {
  final String id;
  final String title;
  final String imageUrl;
  final double originalPrice;
  final double currentPrice;
  final double discountPercent;
  final String platform; // Steam, Epic, PSN, Xbox, Nintendo
  final String dealUrl;
  final DateTime expiresAt;

  GameDeal({
    required this.id,
    required this.title,
    required this.imageUrl,
    required this.originalPrice,
    required this.currentPrice,
    required this.discountPercent,
    required this.platform,
    required this.dealUrl,
    required this.expiresAt,
  });

  factory GameDeal.fromFirestore(Map<String, dynamic> data, String docId) {
    return GameDeal(
      id: docId,
      title: data['title'] ?? '',
      imageUrl: data['imageUrl'] ?? '',
      originalPrice: (data['originalPrice'] ?? 0.0).toDouble(),
      currentPrice: (data['currentPrice'] ?? 0.0).toDouble(),
      discountPercent: (data['discountPercent'] ?? 0.0).toDouble(),
      platform: data['platform'] ?? 'Steam',
      dealUrl: data['dealUrl'] ?? '',
      expiresAt: (data['expiresAt'] != null) 
          ? DateTime.parse(data['expiresAt']) 
          : DateTime.now().add(const Duration(days: 7)),
    );
  }

  Map<String, dynamic> toFirestore() {
    return {
      'title': title,
      'imageUrl': imageUrl,
      'originalPrice': originalPrice,
      'currentPrice': currentPrice,
      'discountPercent': discountPercent,
      'platform': platform,
      'dealUrl': dealUrl,
      'expiresAt': expiresAt.toIso8601String(),
    };
  }
}
`
  },
  "lib/models/news_article.dart": {
    path: "lib/models/news_article.dart",
    name: "news_article.dart",
    language: "dart",
    content: `class NewsArticle {
  final String id;
  final String title;
  final String summary;
  final String content;
  final String imageUrl;
  final String category; // GTA, Fortnite, EA FC, CoD, Minecraft, PS, Xbox, Nintendo
  final DateTime publishedAt;
  final String sourceName;

  NewsArticle({
    required this.id,
    required this.title,
    required this.summary,
    required this.content,
    required this.imageUrl,
    required this.category,
    required this.publishedAt,
    required this.sourceName,
  });

  factory NewsArticle.fromFirestore(Map<String, dynamic> data, String docId) {
    return NewsArticle(
      id: docId,
      title: data['title'] ?? '',
      summary: data['summary'] ?? '',
      content: data['content'] ?? '',
      imageUrl: data['imageUrl'] ?? '',
      category: data['category'] ?? 'PlayStation',
      publishedAt: (data['publishedAt'] != null)
          ? DateTime.parse(data['publishedAt'])
          : DateTime.now(),
      sourceName: data['sourceName'] ?? 'Gamer Alerta News',
    );
  }

  Map<String, dynamic> toFirestore() {
    return {
      'title': title,
      'summary': summary,
      'content': content,
      'imageUrl': imageUrl,
      'category': category,
      'publishedAt': publishedAt.toIso8601String(),
      'sourceName': sourceName,
    };
  }
}
`
  },
  "lib/models/free_game.dart": {
    path: "lib/models/free_game.dart",
    name: "free_game.dart",
    language: "dart",
    content: `class FreeGame {
  final String id;
  final String title;
  final String imageUrl;
  final String platform; // Epic Games, Steam, Prime Gaming, Outros
  final String freeGameUrl;
  final DateTime startDate;
  final DateTime endDate;

  FreeGame({
    required this.id,
    required this.title,
    required this.imageUrl,
    required this.platform,
    required this.freeGameUrl,
    required this.startDate,
    required this.endDate,
  });

  factory FreeGame.fromFirestore(Map<String, dynamic> data, String docId) {
    return FreeGame(
      id: docId,
      title: data['title'] ?? '',
      imageUrl: data['imageUrl'] ?? '',
      platform: data['platform'] ?? 'Epic Games',
      freeGameUrl: data['freeGameUrl'] ?? '',
      startDate: (data['startDate'] != null)
          ? DateTime.parse(data['startDate'])
          : DateTime.now(),
      endDate: (data['endDate'] != null)
          ? DateTime.parse(data['endDate'])
          : DateTime.now().add(const Duration(days: 7)),
    );
  }

  Map<String, dynamic> toFirestore() {
    return {
      'title': title,
      'imageUrl': imageUrl,
      'platform': platform,
      'freeGameUrl': freeGameUrl,
      'startDate': startDate.toIso8601String(),
      'endDate': endDate.toIso8601String(),
    };
  }
}
`
  },
  "lib/models/user_profile.dart": {
    path: "lib/models/user_profile.dart",
    name: "user_profile.dart",
    language: "dart",
    content: `class UserProfile {
  final String uid;
  final String name;
  final String email;
  final String? photoUrl;
  final List<String> favoriteDeals; // GameDeal IDs
  final List<String> favoriteNews; // News IDs
  final Map<String, dynamic> alertPreferences;

  UserProfile({
    required this.uid,
    required this.name,
    required this.email,
    this.photoUrl,
    required this.favoriteDeals,
    required this.favoriteNews,
    required this.alertPreferences,
  });

  factory UserProfile.fromFirestore(Map<String, dynamic> data, String uid) {
    return UserProfile(
      uid: uid,
      name: data['name'] ?? 'Usuário',
      email: data['email'] ?? '',
      photoUrl: data['photoUrl'],
      favoriteDeals: List<String>.from(data['favoriteDeals'] ?? []),
      favoriteNews: List<String>.from(data['favoriteNews'] ?? []),
      alertPreferences: Map<String, dynamic>.from(data['alertPreferences'] ?? {
        'new_promotions': true,
        'free_games': true,
        'breaking_news': true,
      }),
    );
  }

  Map<String, dynamic> toFirestore() {
    return {
      'name': name,
      'email': email,
      'photoUrl': photoUrl,
      'favoriteDeals': favoriteDeals,
      'favoriteNews': favoriteNews,
      'alertPreferences': alertPreferences,
    };
  }
}
`
  },
  "lib/services/firebase_auth_service.dart": {
    path: "lib/services/firebase_auth_service.dart",
    name: "firebase_auth_service.dart",
    language: "dart",
    content: `import 'package:firebase_auth/firebase_auth.dart';

class FirebaseAuthService {
  final FirebaseAuth _auth = FirebaseAuth.instance;

  // Obter usuário atual
  User? get currentUser => _auth.currentUser;

  // Stream de mudanças na autenticação
  Stream<User?> get authStateChanges => _auth.authStateChanges();

  // Cadastro com Email e Senha
  Future<UserCredential?> signUpWithEmailAndPassword(String email, String password) async {
    try {
      return await _auth.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );
    } on FirebaseAuthException catch (e) {
      throw _handleAuthException(e);
    }
  }

  // Login com Email e Senha
  Future<UserCredential?> signInWithEmailAndPassword(String email, String password) async {
    try {
      return await _auth.signInWithEmailAndPassword(
        email: email,
        password: password,
      );
    } on FirebaseAuthException catch (e) {
      throw _handleAuthException(e);
    }
  }

  // Redefinição de Senha
  Future<void> sendPasswordResetEmail(String email) async {
    try {
      await _auth.sendPasswordResetEmail(email: email);
    } on FirebaseAuthException catch (e) {
      throw _handleAuthException(e);
    }
  }

  // Logout
  Future<void> signOut() async {
    await _auth.signOut();
  }

  // Tratamento personalizado de erros
  String _handleAuthException(FirebaseAuthException e) {
    switch (e.code) {
      case 'user-not-found':
        return 'Nenhum usuário cadastrado com este e-mail.';
      case 'wrong-password':
        return 'Senha incorreta. Tente novamente.';
      case 'email-already-in-use':
        return 'Este e-mail já está em uso por outra conta.';
      case 'weak-password':
        return 'A senha é muito fraca. Digite ao menos 6 caracteres.';
      case 'invalid-email':
        return 'Formato de e-mail inválido.';
      default:
        return e.message ?? 'Ocorreu um erro inesperado na autenticação.';
    }
  }
}
`
  },
  "lib/services/firestore_service.dart": {
    path: "lib/services/firestore_service.dart",
    name: "firestore_service.dart",
    language: "dart",
    content: `import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:gamer_alerta/models/game_deal.dart';
import 'package:gamer_alerta/models/news_article.dart';
import 'package:gamer_alerta/models/free_game.dart';
import 'package:gamer_alerta/models/user_profile.dart';

class FirestoreService {
  final FirebaseFirestore _db = FirebaseFirestore.instance;

  // --- COLEÇÃO USUÁRIO ---
  Future<void> createUserProfile(UserProfile profile) async {
    await _db.collection('users').doc(profile.uid).set(profile.toFirestore());
  }

  Future<UserProfile?> getUserProfile(String uid) async {
    final doc = await _db.collection('users').doc(uid).get();
    if (doc.exists && doc.data() != null) {
      return UserProfile.fromFirestore(doc.data()!, uid);
    }
    return null;
  }

  Future<void> updateFavorites(String uid, List<String> favoriteDeals) async {
    await _db.collection('users').doc(uid).update({
      'favoriteDeals': favoriteDeals,
    });
  }

  Future<void> updateAlertPreferences(String uid, Map<String, dynamic> prefs) async {
    await _db.collection('users').doc(uid).update({
      'alertPreferences': prefs,
    });
  }

  // --- COLEÇÃO PROMOÇÕES ---
  Stream<List<GameDeal>> getDeals() {
    return _db.collection('deals')
        .orderBy('discountPercent', descending: true)
        .snapshots()
        .map((snapshot) => snapshot.docs
            .map((doc) => GameDeal.fromFirestore(doc.data(), doc.id))
            .toList());
  }

  // --- COLEÇÃO NOTÍCIAS ---
  Stream<List<NewsArticle>> getNews() {
    return _db.collection('news')
        .orderBy('publishedAt', descending: true)
        .snapshots()
        .map((snapshot) => snapshot.docs
            .map((doc) => NewsArticle.fromFirestore(doc.data(), doc.id))
            .toList());
  }

  // --- COLEÇÃO JOGOS GRATUITOS ---
  Stream<List<FreeGame>> getFreeGames() {
    return _db.collection('free_games')
        .snapshots()
        .map((snapshot) => snapshot.docs
            .map((doc) => FreeGame.fromFirestore(doc.data(), doc.id))
            .toList());
  }
}
`
  },
  "lib/services/notification_service.dart": {
    path: "lib/services/notification_service.dart",
    name: "notification_service.dart",
    language: "dart",
    content: `import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';

class NotificationService {
  final FirebaseMessaging _fcm = FirebaseMessaging.instance;
  final FlutterLocalNotificationsPlugin _localNotifications = FlutterLocalNotificationsPlugin();

  Future<void> initialize() async {
    // Solicitar permissão (iOS)
    await _fcm.requestPermission(
      alert: true,
      badge: true,
      sound: true,
    );

    // Obter Token do Dispositivo para envio segmentado
    String? token = await _fcm.getToken();
    print("FCM Device Token: $token");

    // Inscrição em Tópicos Globais de Gamer Alerta
    await _fcm.subscribeToTopic('all_deals');
    await _fcm.subscribeToTopic('free_games');
    await _fcm.subscribeToTopic('breaking_news');

    // Inicialização das notificações locais (para o app em primeiro plano)
    const AndroidInitializationSettings androidSettings = AndroidInitializationSettings('@mipmap/ic_launcher');
    const DarwinInitializationSettings iosSettings = DarwinInitializationSettings();
    const InitializationSettings initSettings = InitializationSettings(android: androidSettings, iOS: iosSettings);

    await _localNotifications.initialize(initSettings);

    // Handler de mensagens em primeiro plano (Foreground)
    FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      RemoteNotification? notification = message.notification;
      AndroidNotification? android = message.notification?.android;

      if (notification != null) {
        _showLocalNotification(
          notification.hashCode,
          notification.title ?? '',
          notification.body ?? '',
        );
      }
    });
  }

  Future<void> _showLocalNotification(int id, String title, String body) async {
    const AndroidNotificationDetails androidDetails = AndroidNotificationDetails(
      'gamer_alerta_channel',
      'Alertas Gamer Alerta',
      channelDescription: 'Canal de alertas de ofertas e notícias importantes',
      importance: Importance.max,
      priority: Priority.high,
      icon: '@mipmap/ic_launcher',
    );

    const NotificationDetails platformDetails = NotificationDetails(android: androidDetails);
    await _localNotifications.show(id, title, body, platformDetails);
  }
}
`
  },
  "lib/providers/theme_provider.dart": {
    path: "lib/providers/theme_provider.dart",
    name: "theme_provider.dart",
    language: "dart",
    content: `import 'package:flutter/material';
import 'package:shared_preferences/shared_preferences.dart';

class ThemeProvider extends ChangeNotifier {
  ThemeMode _themeMode = ThemeMode.dark; // Tema Escuro como padrão!
  
  ThemeMode get themeMode => _themeMode;
  bool get isDarkMode => _themeMode == ThemeMode.dark;

  ThemeProvider() {
    _loadThemePreference();
  }

  void toggleTheme() async {
    if (_themeMode == ThemeMode.dark) {
      _themeMode = ThemeMode.light;
    } else {
      _themeMode = ThemeMode.dark;
    }
    notifyListeners();
    
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool('isDarkMode', _themeMode == ThemeMode.dark);
  }

  void _loadThemePreference() async {
    final prefs = await SharedPreferences.getInstance();
    bool isDark = prefs.getBool('isDarkMode') ?? true; // Padrão: Escuro (true)
    _themeMode = isDark ? ThemeMode.dark : ThemeMode.light;
    notifyListeners();
  }
}
`
  },
  "lib/providers/auth_provider.dart": {
    path: "lib/providers/auth_provider.dart",
    name: "auth_provider.dart",
    language: "dart",
    content: `import 'package:flutter/material';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:gamer_alerta/models/user_profile.dart';
import 'package:gamer_alerta/services/firebase_auth_service.dart';
import 'package:gamer_alerta/services/firestore_service.dart';

enum AuthState { uninitialized, authenticated, authenticating, unauthenticated, error }

class AuthProvider extends ChangeNotifier {
  final FirebaseAuthService _authService = FirebaseAuthService();
  final FirestoreService _firestoreService = FirestoreService();

  AuthState _state = AuthState.uninitialized;
  User? _firebaseUser;
  UserProfile? _userProfile;
  String _errorMessage = '';

  AuthState get state => _state;
  User? get firebaseUser => _firebaseUser;
  UserProfile? get userProfile => _userProfile;
  String get errorMessage => _errorMessage;

  AuthProvider() {
    _authService.authStateChanges.listen(_onAuthStateChanged);
  }

  Future<void> _onAuthStateChanged(User? user) async {
    if (user == null) {
      _state = AuthState.unauthenticated;
      _firebaseUser = null;
      _userProfile = null;
    } else {
      _firebaseUser = user;
      _state = AuthState.authenticating;
      notifyListeners();
      _userProfile = await _firestoreService.getUserProfile(user.uid);
      
      if (_userProfile == null) {
        // Criar perfil padrão se for o primeiro login
        _userProfile = UserProfile(
          uid: user.uid,
          name: user.displayName ?? user.email?.split('@')[0] ?? 'Gamer',
          email: user.email ?? '',
          photoUrl: user.photoURL,
          favoriteDeals: [],
          favoriteNews: [],
          alertPreferences: {
            'new_promotions': true,
            'free_games': true,
            'breaking_news': true,
          },
        );
        await _firestoreService.createUserProfile(_userProfile!);
      }
      _state = AuthState.authenticated;
    }
    notifyListeners();
  }

  Future<bool> signInWithEmail(String email, String password) async {
    try {
      _state = AuthState.authenticating;
      _errorMessage = '';
      notifyListeners();
      await _authService.signInWithEmailAndPassword(email, password);
      return true;
    } catch (e) {
      _state = AuthState.error;
      _errorMessage = e.toString();
      notifyListeners();
      return false;
    }
  }

  Future<bool> signUpWithEmail(String name, String email, String password) async {
    try {
      _state = AuthState.authenticating;
      _errorMessage = '';
      notifyListeners();
      
      UserCredential? cred = await _authService.signUpWithEmailAndPassword(email, password);
      if (cred?.user != null) {
        await cred!.user!.updateDisplayName(name);
        _userProfile = UserProfile(
          uid: cred.user!.uid,
          name: name,
          email: email,
          favoriteDeals: [],
          favoriteNews: [],
          alertPreferences: {
            'new_promotions': true,
            'free_games': true,
            'breaking_news': true,
          },
        );
        await _firestoreService.createUserProfile(_userProfile!);
      }
      return true;
    } catch (e) {
      _state = AuthState.error;
      _errorMessage = e.toString();
      notifyListeners();
      return false;
    }
  }

  Future<void> toggleFavoriteDeal(String dealId) async {
    if (_userProfile == null) return;
    
    final updatedFavorites = List<String>.from(_userProfile!.favoriteDeals);
    if (updatedFavorites.contains(dealId)) {
      updatedFavorites.remove(dealId);
    } else {
      updatedFavorites.add(dealId);
    }
    
    _userProfile = UserProfile(
      uid: _userProfile!.uid,
      name: _userProfile!.name,
      email: _userProfile!.email,
      photoUrl: _userProfile!.photoUrl,
      favoriteDeals: updatedFavorites,
      favoriteNews: _userProfile!.favoriteNews,
      alertPreferences: _userProfile!.alertPreferences,
    );
    notifyListeners();
    await _firestoreService.updateFavorites(_userProfile!.uid, updatedFavorites);
  }

  Future<void> signOut() async {
    _state = AuthState.authenticating;
    notifyListeners();
    await _authService.signOut();
  }
}
`
  },
  "lib/utils/theme.dart": {
    path: "lib/utils/theme.dart",
    name: "theme.dart",
    language: "dart",
    content: `import 'package:flutter/material';
import 'package:google_fonts/google_fonts.dart';

class GamerAlertaTheme {
  // Paleta de Cores Recomendada (Discord & Steam vibe)
  static const Color darkBg = Color(0xFF0F172A); // Slate 900
  static const Color darkCard = Color(0xFF1E293B); // Slate 800
  static const Color primaryBlue = Color(0xFF2563EB); // Azul Gamer
  static const Color accentOrange = Color(0xFFF97316); // Laranja Ofertas
  static const Color darkText = Color(0xFFF1F5F9); // Slate 100
  
  static const Color lightBg = Color(0xFFF8FAFC);
  static const Color lightCard = Colors.white;
  static const Color lightText = Color(0xFF0F172A);

  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      scaffoldBackgroundColor: darkBg,
      primaryColor: primaryBlue,
      cardColor: darkCard,
      colorScheme: const ColorScheme.dark(
        primary: primaryBlue,
        secondary: accentOrange,
        background: darkBg,
        surface: darkCard,
        onPrimary: Colors.white,
        onSecondary: Colors.white,
      ),
      textTheme: GoogleFonts.interTextTheme(ThemeData.dark().textTheme).copyWith(
        titleLarge: GoogleFonts.spaceGrotesk(
          fontWeight: FontWeight.bold,
          color: darkText,
          fontSize: 22,
        ),
        titleMedium: GoogleFonts.spaceGrotesk(
          fontWeight: FontWeight.w600,
          color: darkText,
          fontSize: 18,
        ),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: darkBg,
        elevation: 0,
        centerTitle: true,
        titleTextStyle: TextStyle(
          fontFamily: 'SpaceGrotesk',
          fontWeight: FontWeight.bold,
          fontSize: 20,
        ),
      ),
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: Color(0xFF0B0F19),
        selectedItemColor: primaryBlue,
        unselectedItemColor: Colors.grey,
        selectedLabelStyle: TextStyle(fontWeight: FontWeight.bold, fontSize: 11),
      ),
    );
  }

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.light,
      scaffoldBackgroundColor: lightBg,
      primaryColor: primaryBlue,
      cardColor: lightCard,
      colorScheme: const ColorScheme.light(
        primary: primaryBlue,
        secondary: accentOrange,
        background: lightBg,
        surface: lightCard,
        onPrimary: Colors.white,
      ),
      textTheme: GoogleFonts.interTextTheme(ThemeData.light().textTheme).copyWith(
        titleLarge: GoogleFonts.spaceGrotesk(
          fontWeight: FontWeight.bold,
          color: lightText,
          fontSize: 22,
        ),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: lightBg,
        elevation: 0,
        iconTheme: IconThemeData(color: lightText),
        centerTitle: true,
        titleTextStyle: TextStyle(
          color: lightText,
          fontWeight: FontWeight.bold,
          fontSize: 20,
        ),
      ),
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: Colors.white,
        selectedItemColor: primaryBlue,
        unselectedItemColor: Colors.grey,
        selectedLabelStyle: TextStyle(fontWeight: FontWeight.bold, fontSize: 11),
      ),
    );
  }
}
`
  },
  "lib/screens/splash_screen.dart": {
    path: "lib/screens/splash_screen.dart",
    name: "splash_screen.dart",
    language: "dart",
    content: `import 'package:flutter/material';
import 'package:provider/provider.dart';
import 'package:gamer_alerta/providers/auth_provider.dart';
import 'package:gamer_alerta/screens/login_screen.dart';
import 'package:gamer_alerta/screens/main_navigation_screen.dart';
import 'package:animate_do/animate_do.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    _navigateToNext();
  }

  void _navigateToNext() async {
    // 2 segundos de exibição da Splash Screen
    await Future.delayed(const Duration(seconds: 2));
    
    if (!mounted) return;
    
    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    
    if (authProvider.state == AuthState.authenticated) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (_) => const MainNavigationScreen()),
      );
    } else {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (_) => const LoginScreen()),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0F172A),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Logo Gamer Alerta Animada
            FadeInDown(
              duration: const Duration(milliseconds: 800),
              child: Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  border: Border.all(color: const Color(0xFFF97316), width: 3),
                  boxShadow: [
                    BoxShadow(
                      color: const Color(0xFF2563EB).withOpacity(0.3),
                      blurRadius: 20,
                      spreadRadius: 5,
                    ),
                  ],
                ),
                child: const Icon(
                  Icons.sports_esports,
                  size: 80,
                  color: Color(0xFF2563EB),
                ),
              ),
            ),
            const SizedBox(height: 24),
            // Nome do aplicativo
            FadeInUp(
              duration: const Duration(milliseconds: 800),
              delay: const Duration(milliseconds: 200),
              child: RichText(
                text: const TextSpan(
                  children: [
                    TextSpan(
                      text: 'Gamer',
                      style: TextStyle(
                        fontFamily: 'SpaceGrotesk',
                        fontWeight: FontWeight.bold,
                        fontSize: 32,
                        color: Colors.white,
                      ),
                    ),
                    TextSpan(
                      text: ' Alerta',
                      style: TextStyle(
                        fontFamily: 'SpaceGrotesk',
                        fontWeight: FontWeight.bold,
                        fontSize: 32,
                        color: Color(0xFFF97316),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 12),
            // Slogan
            FadeIn(
              duration: const Duration(seconds: 1),
              delay: const Duration(milliseconds: 500),
              child: const Text(
                'Promoções, Notícias e Jogos Grátis',
                style: TextStyle(
                  color: Colors.grey,
                  fontSize: 14,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
`
  },
  "lib/screens/login_screen.dart": {
    path: "lib/screens/login_screen.dart",
    name: "login_screen.dart",
    language: "dart",
    content: `import 'package:flutter/material';
import 'package:provider/provider.dart';
import 'package:gamer_alerta/providers/auth_provider.dart';
import 'package:gamer_alerta/screens/main_navigation_screen.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _obscurePassword = true;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  void _submit() async {
    if (!_formKey.currentState!.validate()) return;
    
    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    bool success = await authProvider.signInWithEmail(
      _emailController.text.trim(),
      _passwordController.text.trim(),
    );

    if (success && mounted) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (_) => const MainNavigationScreen()),
      );
    } else if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(authProvider.errorMessage),
          backgroundColor: Colors.redAccent,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final authProvider = Provider.of<AuthProvider>(context);
    
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: 40),
              const Center(
                child: Icon(
                  Icons.sports_esports,
                  size: 70,
                  color: Color(0xFF2563EB),
                ),
              ),
              const SizedBox(height: 16),
              const Text(
                'Bem-vindo de volta, Gamer!',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  fontFamily: 'SpaceGrotesk',
                ),
              ),
              const SizedBox(height: 8),
              const Text(
                'Acesse sua conta para ver alertas personalizados',
                textAlign: TextAlign.center,
                style: TextStyle(color: Colors.grey),
              ),
              const SizedBox(height: 40),
              Form(
                key: _formKey,
                child: Column(
                  children: [
                    TextFormField(
                      controller: _emailController,
                      keyboardType: TextInputType.emailAddress,
                      decoration: const InputDecoration(
                        labelText: 'E-mail',
                        prefixIcon: Icon(Icons.email_outlined),
                        border: OutlineInputBorder(),
                      ),
                      validator: (val) => val == null || !val.contains('@') 
                          ? 'Insira um e-mail válido' : null,
                    ),
                    const SizedBox(height: 16),
                    TextFormField(
                      controller: _passwordController,
                      obscureText: _obscurePassword,
                      decoration: InputDecoration(
                        labelText: 'Senha',
                        prefixIcon: const Icon(Icons.lock_outline),
                        suffixIcon: IconButton(
                          icon: Icon(_obscurePassword ? Icons.visibility_off : Icons.visibility),
                          onPressed: () => setState(() => _obscurePassword = !_obscurePassword),
                        ),
                        border: const OutlineInputBorder(),
                      ),
                      validator: (val) => val == null || val.length < 6 
                          ? 'A senha deve conter no mínimo 6 caracteres' : null,
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 12),
              Align(
                alignment: Alignment.centerRight,
                child: TextButton(
                  onPressed: () {
                    // Implementar recuperação de senha
                  },
                  child: const Text('Esqueceu a senha?'),
                ),
              ),
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: authProvider.state == AuthState.authenticating ? null : _submit,
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF2563EB),
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                ),
                child: authProvider.state == AuthState.authenticating
                    ? const CircularProgressIndicator(color: Colors.white)
                    : const Text(
                        'Entrar',
                        style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Colors.white),
                      ),
              ),
              const SizedBox(height: 16),
              // Botão Google
              OutlinedButton.icon(
                onPressed: () {
                  // Login com Google
                },
                icon: const Icon(Icons.g_mobiledata, size: 30),
                label: const Text('Entrar com o Google'),
                style: OutlinedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 12),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
`
  },
  "lib/screens/main_navigation_screen.dart": {
    path: "lib/screens/main_navigation_screen.dart",
    name: "main_navigation_screen.dart",
    language: "dart",
    content: `import 'package:flutter/material';
import 'package:gamer_alerta/screens/home_screen.dart';
import 'package:gamer_alerta/screens/deals_screen.dart';
import 'package:gamer_alerta/screens/news_screen.dart';
import 'package:gamer_alerta/screens/favorites_screen.dart';
import 'package:gamer_alerta/screens/profile_screen.dart';

class MainNavigationScreen extends StatefulWidget {
  const MainNavigationScreen({super.key});

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  int _currentIndex = 0;

  final List<Widget> _screens = [
    const HomeScreen(),
    const DealsScreen(),
    const NewsScreen(),
    const FavoritesScreen(),
    const ProfileScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: _screens,
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) => setState(() => _currentIndex = index),
        type: BottomNavigationBarType.fixed,
        selectedItemColor: const Color(0xFF2563EB),
        unselectedItemColor: Colors.grey,
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home_outlined),
            activeIcon: Icon(Icons.home),
            label: 'Início',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.local_offer_outlined),
            activeIcon: Icon(Icons.local_offer),
            label: 'Promoções',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.newspaper_outlined),
            activeIcon: Icon(Icons.newspaper),
            label: 'Notícias',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.favorite_outline),
            activeIcon: Icon(Icons.favorite),
            label: 'Favoritos',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person_outline),
            activeIcon: Icon(Icons.person),
            label: 'Perfil',
          ),
        ],
      ),
    );
  }
}
`
  },
  "README.md": {
    path: "README.md",
    name: "README.md",
    language: "markdown",
    content: `# Gamer Alerta 🎮🍊

Gamer Alerta é um aplicativo completo em **Flutter** para reunir notícias quentes, as melhores promoções, listagens de jogos gratuitos das principais lojas digitais e alertas personalizados diretamente em seu smartphone.

## 🚀 Como Executar o Projeto Flutter

### Pré-requisitos
- **Flutter SDK** instalado (versão >= 3.0.0)
- **Dart SDK** incluído
- Um emulador Android/iOS ou dispositivo físico conectado com depuração ativa
- Conta no **Firebase** com um projeto ativo

### Passo a Passo

1. **Clonar/Extrair o Código**
   Substitua sua pasta \`lib\` e o arquivo \`pubspec.yaml\` do seu projeto Flutter pelos códigos fornecidos neste painel de desenvolvedor.

2. **Obter dependências do Flutter**
   No terminal da raiz do seu projeto Flutter, execute:
   \`\`\`bash
   flutter pub get
   \`\`\`

3. **Configurar o Firebase**

   Utilize o assistente oficial do Firebase CLI para vincular seu projeto Flutter de forma rápida e segura:
   \`\`\`bash
   dart pub global activate flutterfire_cli
   flutterfire configure
   \`\`\`
   Este comando criará o arquivo \`lib/firebase_options.dart\` com as chaves corretas e adicionará as tags nativas para Android (\`google-services.json\`) e iOS (\`GoogleService-Info.plist\`).

4. **Carregar as coleções no Cloud Firestore**
   O aplicativo lê dados de três coleções principais no Firestore. Você deve criar as coleções com as seguintes estruturas de exemplo:
   
   - **Coleção \`deals\`** (Promoções):
     \`\`\`json
     {
       "title": "Elden Ring",
       "imageUrl": "https://images.unsplash.com/photo-1655821888788-6107699e173b",
       "originalPrice": 249.90,
       "currentPrice": 149.94,
       "discountPercent": 40.0,
       "platform": "Steam",
       "dealUrl": "https://store.steampowered.com",
       "expiresAt": "2026-07-30T16:00:00Z"
     }
     \`\`\`
     
   - **Coleção \`news\`** (Notícias):
     \`\`\`json
     {
       "title": "GTA VI recebe novas imagens espetaculares",
       "summary": "Rockstar divulga novos visuais mostrando Vice City com reflexos em ray-tracing.",
       "content": "Conteúdo completo com novidades técnicas da engine RAGE...",
       "imageUrl": "https://images.unsplash.com/photo-1542751371-adc38448a05e",
       "category": "GTA",
       "publishedAt": "2026-07-20T12:00:00Z",
       "sourceName": "Rockstar Newswire"
     }
     \`\`\`
     
   - **Coleção \`free_games\`** (Jogos Gratuitos):
     \`\`\`json
     {
       "title": "Cyberpunk 2077 Weekend",
       "imageUrl": "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
       "platform": "Epic Games",
       "freeGameUrl": "https://epicgames.com",
       "startDate": "2026-07-20T10:00:00Z",
       "endDate": "2026-07-27T10:00:00Z"
     }
     \`\`\`

5. **Iniciar o aplicativo**
   Conecte seu dispositivo ou ative o simulador e digite:
   \`\`\`bash
   flutter run
   \`\`\`

## 📦 Preparação para Publicação (Deploy)

### Android (Google Play)
1. Configure as chaves de assinatura em \`android/key.properties\` e atualize \`android/app/build.gradle\`.
2. Adicione as logos em diferentes densidades em \`android/app/src/main/res\`.
3. Gere o App Bundle otimizado:
   \`\`\`bash
   flutter build appbundle
   \`\`\`

### iOS (App Store)
1. Abra a pasta \`ios/\` no Xcode.
2. Defina o seu **Signing Team** na aba *Signing & Capabilities*.
3. Defina permissões de notificações e rede no \`ios/Runner/Info.plist\`.
4. Faça o arquivo do build:
   \`\`\`bash
   flutter build ipa
   \`\`\`
`
  }
};

import React, { useState } from "react";
import { 
  Folder, 
  FolderOpen, 
  FileCode, 
  Copy, 
  Check, 
  BookOpen, 
  Rocket, 
  Terminal, 
  Cpu, 
  Database, 
  Key, 
  Download,
  Flame,
  Info,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { flutterCodebase, FlutterFile } from "../data/flutterCode";

export default function DeveloperDashboard() {
  const [activeTab, setActiveTab] = useState<"code" | "firebase" | "deploy">("code");
  const [selectedFileKey, setSelectedFileKey] = useState<string>("pubspec.yaml");
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    "root": true,
    "lib": true,
    "models": true,
    "services": true,
    "providers": true,
    "screens": true,
    "widgets": true,
    "utils": true
  });
  const [copied, setCopied] = useState(false);

  const selectedFile = flutterCodebase[selectedFileKey] || {
    name: "pubspec.yaml",
    path: "pubspec.yaml",
    content: "File not found",
    language: "yaml"
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFolder = (folderName: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderName]: !prev[folderName]
    }));
  };

  // Extract directory structure dynamically from keys
  const getFilesForFolder = (folderPrefix: string) => {
    return Object.keys(flutterCodebase)
      .filter(key => {
        if (folderPrefix === "root") {
          return !key.includes("/");
        }
        const parts = key.split("/");
        if (parts.length < 2) return false;
        
        if (folderPrefix === "lib") {
          return parts[0] === "lib" && parts.length === 2;
        }
        
        // Deep folders under lib (e.g. lib/models/)
        return parts[0] === "lib" && parts[1] === folderPrefix;
      })
      .map(key => flutterCodebase[key]);
  };

  return (
    <div className="flex-1 bg-[#151921] border border-slate-800 rounded-3xl overflow-hidden flex flex-col h-[740px] shadow-2xl" id="gamer-alerta-dev-dashboard">
      
      {/* Header Panel */}
      <div className="bg-[#1E232E]/80 px-6 py-4 border-b border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-[#F97316]/10 border border-[#F97316]/25 text-[#F97316] text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded">
              Flutter SDK v3+
            </span>
            <span className="text-slate-400 text-xs font-mono font-medium">Clean Architecture • MVVM</span>
          </div>
          <h2 className="text-base font-bold font-display text-white mt-1 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#2563EB]" />
            Workspace do Desenvolvedor Gamer Alerta
          </h2>
        </div>

        {/* Action tabs */}
        <div className="flex bg-[#151921] p-1 rounded-xl border border-slate-800 w-full md:w-auto shadow-inner">
          <button 
            onClick={() => setActiveTab("code")}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${activeTab === "code" ? "bg-[#2563EB] text-white shadow-md shadow-blue-900/30" : "text-slate-400 hover:text-white"}`}
          >
            <FileCode className="w-4 h-4" />
            <span>Código Fonte</span>
          </button>
          
          <button 
            onClick={() => setActiveTab("firebase")}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${activeTab === "firebase" ? "bg-[#F97316] text-white shadow-md shadow-orange-900/30" : "text-slate-400 hover:text-[#F97316]"}`}
          >
            <Database className="w-4 h-4" />
            <span>Setup Firebase</span>
          </button>

          <button 
            onClick={() => setActiveTab("deploy")}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${activeTab === "deploy" ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/30" : "text-slate-400 hover:text-indigo-400"}`}
          >
            <Rocket className="w-4 h-4" />
            <span>Publicação</span>
          </button>
        </div>
      </div>

      {/* Main Panel Content */}
      <div className="flex-1 flex min-h-0">
        
        {/* ----------------- TAB 1: CODE EXPLORER & EDITOR ----------------- */}
        {activeTab === "code" && (
          <div className="flex-1 flex min-h-0">
            {/* Sidebar Code Explorer */}
            <div className="w-64 border-r border-slate-800 bg-[#0B0E14]/60 p-4 overflow-y-auto space-y-4 select-none shrink-0 hidden sm:block">
              <div className="flex items-center gap-1 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <FolderOpen className="w-4 h-4 text-[#F97316]" />
                <span>Estrutura de Pastas</span>
              </div>

              <div className="space-y-1 font-mono text-xs text-slate-300">
                
                {/* Root Files */}
                <div className="pl-1">
                  <div className="flex items-center gap-1.5 py-1 text-slate-400 font-bold">
                    <span>📁 gamer_alerta/</span>
                  </div>
                  
                  {/* pubspec.yaml */}
                  <button 
                    onClick={() => setSelectedFileKey("pubspec.yaml")}
                    className={`flex items-center gap-1.5 pl-4 py-1.5 w-full text-left rounded-md transition-all ${selectedFileKey === "pubspec.yaml" ? "bg-[#1E232E] text-[#F97316] font-bold border-l-2 border-[#F97316] pl-3" : "hover:bg-[#1E232E]/40"}`}
                  >
                    <FileCode className="w-3.5 h-3.5 text-slate-400" />
                    <span>pubspec.yaml</span>
                  </button>

                  {/* README.md */}
                  <button 
                    onClick={() => setSelectedFileKey("README.md")}
                    className={`flex items-center gap-1.5 pl-4 py-1.5 w-full text-left rounded-md transition-all ${selectedFileKey === "README.md" ? "bg-[#1E232E] text-[#F97316] font-bold border-l-2 border-[#F97316] pl-3" : "hover:bg-[#1E232E]/40"}`}
                  >
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    <span>README.md</span>
                  </button>
                </div>

                {/* lib/ directory */}
                <div className="pl-1">
                  <div 
                    onClick={() => toggleFolder("lib")}
                    className="flex items-center gap-1.5 py-1 text-slate-400 cursor-pointer hover:text-white"
                  >
                    {expandedFolders["lib"] ? <FolderOpen className="w-3.5 h-3.5 text-brand-blue" /> : <Folder className="w-3.5 h-3.5 text-brand-blue" />}
                    <span className="font-bold">lib/</span>
                  </div>

                  {expandedFolders["lib"] && (
                    <div className="pl-4 space-y-1 border-l border-slate-850 ml-1.5">
                      
                      {/* main.dart */}
                      <button 
                        onClick={() => setSelectedFileKey("lib/main.dart")}
                        className={`flex items-center gap-1.5 py-1.5 w-full text-left rounded-md transition-all ${selectedFileKey === "lib/main.dart" ? "bg-[#1E232E] text-[#2563EB] font-bold border-l-2 border-[#2563EB] pl-1" : "hover:bg-[#1E232E]/40"}`}
                      >
                        <FileCode className="w-3.5 h-3.5 text-[#2563EB]" />
                        <span>main.dart</span>
                      </button>

                      {/* models/ directory */}
                      <div>
                        <div onClick={() => toggleFolder("models")} className="flex items-center gap-1.5 py-1 cursor-pointer hover:text-white text-slate-400">
                          {expandedFolders["models"] ? <FolderOpen className="w-3 h-3 text-slate-500" /> : <Folder className="w-3 h-3 text-slate-500" />}
                          <span>models/</span>
                        </div>
                        {expandedFolders["models"] && (
                          <div className="pl-3.5 border-l border-slate-800/60 ml-1.5">
                            {["game_deal.dart", "news_article.dart", "free_game.dart", "user_profile.dart"].map(file => {
                              const path = `lib/models/${file}`;
                              return (
                                <button 
                                  key={file} 
                                  onClick={() => setSelectedFileKey(path)}
                                  className={`flex items-center gap-1 py-1 w-full text-left text-[11px] rounded-md ${selectedFileKey === path ? "text-brand-orange font-bold bg-slate-900 px-1" : "hover:bg-slate-900 text-slate-400"}`}
                                >
                                  <span>📄 {file}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* services/ directory */}
                      <div>
                        <div onClick={() => toggleFolder("services")} className="flex items-center gap-1.5 py-1 cursor-pointer hover:text-white text-slate-400">
                          {expandedFolders["services"] ? <FolderOpen className="w-3 h-3 text-slate-500" /> : <Folder className="w-3 h-3 text-slate-500" />}
                          <span>services/</span>
                        </div>
                        {expandedFolders["services"] && (
                          <div className="pl-3.5 border-l border-slate-800/60 ml-1.5">
                            {["firebase_auth_service.dart", "firestore_service.dart", "notification_service.dart"].map(file => {
                              const path = `lib/services/${file}`;
                              return (
                                <button 
                                  key={file} 
                                  onClick={() => setSelectedFileKey(path)}
                                  className={`flex items-center gap-1 py-1 w-full text-left text-[11px] rounded-md ${selectedFileKey === path ? "text-brand-orange font-bold bg-slate-900 px-1" : "hover:bg-slate-900 text-slate-400"}`}
                                >
                                  <span>📄 {file}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* providers/ directory */}
                      <div>
                        <div onClick={() => toggleFolder("providers")} className="flex items-center gap-1.5 py-1 cursor-pointer hover:text-white text-slate-400">
                          {expandedFolders["providers"] ? <FolderOpen className="w-3 h-3 text-slate-500" /> : <Folder className="w-3 h-3 text-slate-500" />}
                          <span>providers/</span>
                        </div>
                        {expandedFolders["providers"] && (
                          <div className="pl-3.5 border-l border-slate-800/60 ml-1.5">
                            {["theme_provider.dart", "auth_provider.dart"].map(file => {
                              const path = `lib/providers/${file}`;
                              return (
                                <button 
                                  key={file} 
                                  onClick={() => setSelectedFileKey(path)}
                                  className={`flex items-center gap-1 py-1 w-full text-left text-[11px] rounded-md ${selectedFileKey === path ? "text-brand-orange font-bold bg-slate-900 px-1" : "hover:bg-slate-900 text-slate-400"}`}
                                >
                                  <span>📄 {file}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* screens/ directory */}
                      <div>
                        <div onClick={() => toggleFolder("screens")} className="flex items-center gap-1.5 py-1 cursor-pointer hover:text-white text-slate-400">
                          {expandedFolders["screens"] ? <FolderOpen className="w-3 h-3 text-slate-500" /> : <Folder className="w-3 h-3 text-slate-500" />}
                          <span>screens/</span>
                        </div>
                        {expandedFolders["screens"] && (
                          <div className="pl-3.5 border-l border-slate-800/60 ml-1.5">
                            {["splash_screen.dart", "login_screen.dart", "main_navigation_screen.dart"].map(file => {
                              const path = `lib/screens/${file}`;
                              return (
                                <button 
                                  key={file} 
                                  onClick={() => setSelectedFileKey(path)}
                                  className={`flex items-center gap-1 py-1 w-full text-left text-[11px] rounded-md ${selectedFileKey === path ? "text-brand-orange font-bold bg-slate-900 px-1" : "hover:bg-slate-900 text-slate-400"}`}
                                >
                                  <span>📄 {file}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* utils/ directory */}
                      <div>
                        <div onClick={() => toggleFolder("utils")} className="flex items-center gap-1.5 py-1 cursor-pointer hover:text-white text-slate-400">
                          {expandedFolders["utils"] ? <FolderOpen className="w-3 h-3 text-slate-500" /> : <Folder className="w-3 h-3 text-slate-500" />}
                          <span>utils/</span>
                        </div>
                        {expandedFolders["utils"] && (
                          <div className="pl-3.5 border-l border-slate-800/60 ml-1.5">
                            {["theme.dart"].map(file => {
                              const path = `lib/utils/${file}`;
                              return (
                                <button 
                                  key={file} 
                                  onClick={() => setSelectedFileKey(path)}
                                  className={`flex items-center gap-1 py-1 w-full text-left text-[11px] rounded-md ${selectedFileKey === path ? "text-brand-orange font-bold bg-slate-900 px-1" : "hover:bg-slate-900 text-slate-400"}`}
                                >
                                  <span>📄 {file}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>

                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Code Content Screen / Editor */}
            <div className="flex-1 flex flex-col min-w-0 bg-[#0B0E14] font-mono text-xs border-l border-slate-800">
              
              {/* Toolbar */}
              <div className="bg-[#1E232E]/80 border-b border-slate-800 px-4 py-2.5 flex justify-between items-center select-none">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-bold text-[11px]">Arquivo Ativo:</span>
                  <span className="text-[#F97316] font-bold text-[11px] bg-[#F97316]/10 px-2.5 py-0.5 rounded border border-[#F97316]/20">{selectedFile.path}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleCopyCode}
                    className="px-3 py-1.5 bg-[#1E232E] hover:bg-[#151921] border border-slate-800 text-slate-200 rounded-lg flex items-center gap-1.5 transition-all font-bold text-[10px] shadow-sm cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-450" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                    <span>{copied ? "Copiado!" : "Copiar"}</span>
                  </button>
                </div>
              </div>

              {/* Editor viewport */}
              <div className="flex-1 p-4 overflow-auto bg-[#0B0E14] text-slate-300 select-text leading-relaxed">
                <pre className="whitespace-pre-wrap font-mono text-[11px]">
                  {selectedFile.content}
                </pre>
              </div>

            </div>
          </div>
        )}

        {/* ----------------- TAB 2: DETAILED FIREBASE INTEGRATION GUIDE ----------------- */}
        {activeTab === "firebase" && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-slate-300 leading-relaxed max-w-4xl mx-auto">
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white font-display flex items-center gap-2">
                <Database className="w-5 h-5 text-brand-orange" />
                Guia de Integração com Firebase Backend
              </h3>
              <p className="text-xs text-slate-400 leading-normal">
                O Gamer Alerta utiliza as APIs nativas do Firebase para persistência de dados em nuvem, controle de contas de usuários (Authentication) e notificações por push para ofertas relâmpago (FCM). Siga os passos detalhados abaixo para implantar.
              </p>
            </div>

            <hr className="border-slate-800" />

            <div className="space-y-4">
              
              {/* Step 1: Auth */}
              <div className="p-5 bg-[#1E232E]/50 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-brand-blue text-white rounded-full flex items-center justify-center text-xs font-black">1</span>
                  <h4 className="font-bold text-white text-sm">Firebase Authentication</h4>
                </div>
                <p className="text-xs text-slate-400">
                  Habilite o provedor de login com <strong>E-mail/Senha</strong> e <strong>Google Login</strong> no console do Firebase:
                </p>
                <ol className="list-decimal pl-5 text-xs text-slate-400 space-y-1">
                  <li>Acesse o <a href="https://console.firebase.google.com" target="_blank" className="text-brand-blue hover:underline">Console do Firebase</a> e clique em <strong>Authentication</strong>.</li>
                  <li>Na aba <strong>Sign-in method</strong>, clique em <strong>Adicionar novo provedor</strong>.</li>
                  <li>Ative o provedor <strong>E-mail/Senha</strong> e salve.</li>
                  <li>Ative o provedor <strong>Google</strong>, preencha o e-mail de suporte e salve.</li>
                </ol>
              </div>

              {/* Step 2: Firestore Rules */}
              <div className="p-5 bg-[#1E232E]/50 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-brand-orange text-white rounded-full flex items-center justify-center text-xs font-black">2</span>
                  <h4 className="font-bold text-white text-sm">Cloud Firestore - Regras de Segurança</h4>
                </div>
                <p className="text-xs text-slate-400">
                  Configure as seguintes regras de segurança no Firestore para garantir privacidade dos favoritos dos usuários, enquanto permite leitura global de notícias e ofertas:
                </p>
                
                <div className="bg-[#0b0e14] p-3 rounded-lg border border-slate-800 font-mono text-[10px] text-slate-400 whitespace-pre">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Qualquer um pode ler notícias, promoções e jogos grátis
    match /news/{document} {
      allow read: if true;
      allow write: if false; // Apenas CMS admin pode criar
    }
    match /deals/{document} {
      allow read: if true;
      allow write: if false;
    }
    match /free_games/{document} {
      allow read: if true;
      allow write: if false;
    }
    
    // Somente o dono autenticado pode ler e gravar seu próprio perfil
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}`}
                </div>
              </div>

              {/* Step 3: FCM setup */}
              <div className="p-5 bg-[#1E232E]/50 rounded-2xl border border-slate-800 space-y-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-black">3</span>
                  <h4 className="font-bold text-white text-sm">Configuração FCM (Firebase Cloud Messaging)</h4>
                </div>
                <p className="text-xs text-slate-400">
                  Para os alertas funcionarem instantaneamente em segundo plano no Android e iOS:
                </p>
                <ul className="list-disc pl-5 text-xs text-slate-400 space-y-1">
                  <li>No Flutter, o plugin <code>firebase_messaging</code> está configurado no arquivo <code>lib/services/notification_service.dart</code>.</li>
                  <li>No <strong>Android</strong>: Certifique-se de que as permissões de notificação do Android 13+ (POST_NOTIFICATIONS) estão ativas no <code>AndroidManifest.xml</code>.</li>
                  <li>No <strong>iOS</strong>: É necessário ativar as capacidades de <strong>Push Notifications</strong> e <strong>Background Modes (Remote notifications)</strong> no Xcode e vincular sua chave de desenvolvedor APNs da Apple.</li>
                </ul>
              </div>

            </div>
          </div>
        )}

        {/* ----------------- TAB 3: APP PUBLISHING DIRECTIVES ----------------- */}
        {activeTab === "deploy" && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-slate-300 leading-relaxed max-w-4xl mx-auto">
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white font-display flex items-center gap-2">
                <Rocket className="w-5 h-5 text-indigo-400" />
                Guia de Publicação nas Lojas Oficiais (Google Play & App Store)
              </h3>
              <p className="text-xs text-slate-400 leading-normal">
                Prepare a versão final de produção de forma otimizada para ser aceita nos rigorosos processos de revisão de aplicativos móveis.
              </p>
            </div>

            <hr className="border-slate-800" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Google Play Box */}
              <div className="p-5 bg-[#1E232E]/50 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between shadow-lg">
                <div>
                  <div className="flex items-center gap-2 text-brand-orange mb-2">
                    <span className="p-1.5 rounded-lg bg-brand-orange/10">🤖</span>
                    <h4 className="font-bold text-white text-sm">Android (Google Play Console)</h4>
                  </div>
                  <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                    A Google Play exige o formato App Bundle (.aab), que reduz o tamanho do download gerando builds específicos para cada tipo de arquitetura de CPU do usuário final.
                  </p>
                  
                  <ul className="list-decimal pl-4 text-xs text-slate-400 space-y-1.5">
                    <li>Altere o nome do pacote (Ex: <code>com.seuusuario.gameralerta</code>) em todos os arquivos de build do gradle.</li>
                    <li>Gere um Keystore de assinatura seguro via <code>keytool</code>.</li>
                    <li>Crie o arquivo <code>android/key.properties</code> vinculando o alias e as senhas.</li>
                    <li>Gere a compilação oficial digitando no terminal:</li>
                  </ul>

                  <div className="bg-[#0b0e14] p-2 rounded border border-slate-800 font-mono text-[10px] text-slate-400 mt-3 whitespace-pre">
                    flutter build appbundle --release
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-900 text-[10px] text-slate-500 italic">
                  O pacote .aab será criado na pasta: build/app/outputs/bundle/release/
                </div>
              </div>

              {/* App Store Box */}
              <div className="p-5 bg-[#1E232E]/50 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between shadow-lg">
                <div>
                  <div className="flex items-center gap-2 text-brand-blue mb-2">
                    <span className="p-1.5 rounded-lg bg-brand-blue/10">🍏</span>
                    <h4 className="font-bold text-white text-sm">iOS (Apple App Store)</h4>
                  </div>
                  <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                    A Apple requer um cadastro de desenvolvedor pago e o uso exclusivo de um computador macOS rodando o Xcode para efetuar o empacotamento assinado e upload.
                  </p>
                  
                  <ul className="list-decimal pl-4 text-xs text-slate-400 space-y-1.5">
                    <li>Abra a pasta <code>ios/</code> do seu projeto Flutter no Xcode.</li>
                    <li>Configure as credenciais do seu Apple Developer Account na aba <strong>Signing & Capabilities</strong>.</li>
                    <li>Certifique-se de preencher a descrição de uso de notificações e dados de rede em <code>Runner/Info.plist</code>.</li>
                    <li>Efetue o arquivamento e exportação digitando:</li>
                  </ul>

                  <div className="bg-[#0b0e14] p-2 rounded border border-slate-800 font-mono text-[10px] text-slate-400 mt-3 whitespace-pre">
                    flutter build ipa
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-900 text-[10px] text-slate-500 italic">
                  Abra o Xcode Organizer para fazer o upload diretamente ao App Store Connect.
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}

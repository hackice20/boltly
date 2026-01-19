import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { StepsList } from '../components/StepsList';
import { FileExplorer } from '../components/FileExplorer';
import { TabView } from '../components/TabView';
import { CodeEditor } from '../components/CodeEditor';
import { PreviewFrame } from '../components/PreviewFrame';
import { Step, FileItem, StepType } from '../types';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { parseXml } from '../steps';
import { useWebContainer } from '../hooks/useWebContainer';
import { REACT_TEMPLATE } from '../templates';
import { Loader } from '../components/Loader';
import DownloadButton from '../components/DownloadButton';
import { Send, Zap, FolderTree, Sun, Moon } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';

// Minimal geometric lightning bolt logo
function BoltLogo({ fill = 'black' }: { fill?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill={fill} />
    </svg>
  );
}

// Collapsible Panel Component with vertical text when collapsed
function CollapsiblePanel({
  title,
  icon,
  children,
  defaultOpen = true,
  isDarkMode,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  isDarkMode: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // Theme colors
  const colors = {
    bg: isDarkMode ? '#18181b' : '#ffffff',
    bgHover: isDarkMode ? '#27272a' : '#f4f4f5',
    border: isDarkMode ? '#27272a' : '#e4e4e7',
    text: isDarkMode ? '#fafafa' : '#18181b',
    textMuted: isDarkMode ? '#a1a1aa' : '#71717a',
    textDim: isDarkMode ? '#52525b' : '#a1a1aa',
    iconBg: isDarkMode ? '#27272a' : '#f4f4f5',
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Main Panel Content */}
      <div
        style={{
          width: isOpen ? '280px' : '0px',
          minWidth: isOpen ? '280px' : '0px',
          overflow: 'hidden',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div
          style={{
            height: '100%',
            borderRadius: '16px',
            backgroundColor: colors.bg,
            border: `1px solid ${colors.border}`,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            transition: 'all 0.3s ease',
          }}
        >
          {/* Panel Header */}
          <div
            style={{
              padding: '14px 16px',
              borderBottom: `1px solid ${colors.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  backgroundColor: colors.iconBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {icon}
              </div>
              <span style={{ fontSize: '14px', fontWeight: 500, color: colors.text }}>{title}</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                width: '24px',
                height: '24px',
                backgroundColor: 'transparent',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: colors.textDim,
                fontSize: '18px',
                borderRadius: '4px',
                transition: 'all 0.15s ease',
              }}
            >
              ‹
            </button>
          </div>
          {/* Panel Content */}
          <div style={{ flex: 1, overflow: 'auto', padding: '12px' }}>{children}</div>
        </div>
      </div>

      {/* Collapsed Bar with Vertical Text */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: '40px',
            minWidth: '40px',
            height: '100%',
            backgroundColor: colors.bg,
            border: `1px solid ${colors.border}`,
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '6px',
              backgroundColor: colors.iconBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </div>
          <span
            style={{
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              transform: 'rotate(180deg)',
              color: colors.textMuted,
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '0.5px',
            }}
          >
            {title}
          </span>
        </button>
      )}
    </div>
  );
}

export function Builder() {
  const location = useLocation();
  const navigate = useNavigate();
  const { prompt } = location.state as { prompt: string };
  const [userPrompt, setPrompt] = useState("");
  const [llmMessages, setLlmMessages] = useState<{ role: "user" | "assistant", content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [templateSet, setTemplateSet] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const webcontainer = useWebContainer();
  const { getToken } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);

  const [steps, setSteps] = useState<Step[]>([]);
  const [files, setFiles] = useState<FileItem[]>([]);

  // Theme colors - matching landing page exactly
  const colors = {
    pageBg: isDarkMode ? '#000000' : '#fafafa',
    cardBg: isDarkMode ? '#18181b' : '#ffffff',
    border: isDarkMode ? '#27272a' : '#e4e4e7',
    borderStrong: isDarkMode ? '#3f3f46' : '#d4d4d8',
    text: isDarkMode ? '#fafafa' : '#18181b',
    textMuted: isDarkMode ? '#a1a1aa' : '#71717a',
    textDim: isDarkMode ? '#52525b' : '#a1a1aa',
    iconBg: isDarkMode ? '#27272a' : '#f4f4f5',
    buttonBg: isDarkMode ? '#27272a' : '#e4e4e7',
    buttonHover: isDarkMode ? '#3f3f46' : '#d4d4d8',
    inputBg: isDarkMode ? '#18181b' : '#ffffff',
  };

  useEffect(() => {
    let originalFiles = [...files];
    let updateHappened = false;
    steps.filter(({ status }) => status === "pending").map(step => {
      updateHappened = true;
      if (step?.type === StepType.CreateFile) {
        let parsedPath = step.path?.split("/") ?? [];
        let currentFileStructure = [...originalFiles];
        let finalAnswerRef = currentFileStructure;

        let currentFolder = ""
        while (parsedPath.length) {
          currentFolder = `${currentFolder}/${parsedPath[0]}`;
          let currentFolderName = parsedPath[0];
          parsedPath = parsedPath.slice(1);

          if (!parsedPath.length) {
            let file = currentFileStructure.find(x => x.path === currentFolder);
            if (!file) {
              currentFileStructure.push({
                name: currentFolderName,
                type: 'file',
                path: currentFolder,
                content: step.code
              });
            } else {
              file.content = step.code;
            }
          } else {
            let folder = currentFileStructure.find(x => x.path === currentFolder);
            if (!folder) {
              currentFileStructure.push({
                name: currentFolderName,
                type: 'folder',
                path: currentFolder,
                children: []
              });
            }
            currentFileStructure = currentFileStructure.find(x => x.path === currentFolder)!.children!;
          }
        }
        originalFiles = finalAnswerRef;
      }
    });

    if (updateHappened) {
      setFiles(originalFiles);
      setSteps(steps => steps.map((s: Step) => ({
        ...s,
        status: "completed"
      })));
    }
  }, [steps, files]);



  // Load template immediately on mount (works without backend)
  useEffect(() => {
    console.log("Builder: Loading React template immediately");
    const templateSteps = parseXml(REACT_TEMPLATE).map((x: Step) => ({
      ...x,
      status: "pending" as "pending"
    }));
    setSteps(templateSteps);
    setTemplateSet(true);
  }, []);

  // Fetch LLM response in background (enhances template with user's prompt)
  async function fetchLLMResponse() {
    try {
      const token = await getToken();
      setLoading(true);

      // Get prompts from backend
      const response = await axios.post(`${BACKEND_URL}/template`, {
        prompt: prompt.trim()
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const { prompts } = response.data;

      // Get LLM-generated code
      const stepsResponse = await axios.post(`${BACKEND_URL}/chat`, {
        messages: [...prompts, prompt].map(content => ({
          role: "user",
          content
        }))
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setLoading(false);

      // Add LLM-generated steps to existing template steps
      const llmSteps = parseXml(stepsResponse.data.response).map(x => ({
        ...x,
        status: "pending" as "pending"
      }));

      setSteps(s => [...s, ...llmSteps]);

      setLlmMessages([...prompts, prompt].map(content => ({
        role: "user",
        content
      })));
      setLlmMessages(x => [...x, { role: "assistant", content: stepsResponse.data.response }]);

    } catch (error) {
      console.error("Builder: Backend API error (preview still works with template)", error);
      setLoading(false);
    }
  }

  // Start LLM fetch in background
  useEffect(() => {
    fetchLLMResponse();
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: colors.pageBg,
        position: 'relative',
        overflow: 'hidden',
        transition: 'background-color 0.3s ease',
      }}
    >
      {/* Grid Background */}
      <div
        className="absolute inset-0 transition-opacity duration-500 ease-in-out"
        style={{
          backgroundImage: `
            linear-gradient(${isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)'} 1px, transparent 1px),
            linear-gradient(90deg, ${isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)'} 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header - matching landing page exactly */}
        <header
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(250, 250, 250, 0.8)',
            backdropFilter: 'blur(12px)',
            borderBottom: `1px solid ${colors.border}`,
            transition: 'all 0.3s ease',
          }}
        >
          {/* Logo - matching landing page exactly */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                backgroundColor: isDarkMode ? 'white' : '#18181b',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <BoltLogo fill={isDarkMode ? 'black' : 'white'} />
            </div>
            <span style={{ fontSize: '16px', fontWeight: 600, color: colors.text }}>Boltly</span>
          </div>

          {/* Project Prompt - Center */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              maxWidth: '400px',
              margin: '0 20px',
            }}
          >
            <span
              style={{
                color: colors.textMuted,
                fontSize: '14px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {prompt}
            </span>
          </div>

          {/* Right side - Download & Theme Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <DownloadButton files={files} isDarkMode={isDarkMode} />

            {/* Theme Toggle - matching landing page exactly */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: colors.buttonBg,
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun style={{ width: '20px', height: '20px', color: '#fbbf24' }} />
              ) : (
                <Moon style={{ width: '20px', height: '20px', color: '#3b82f6' }} />
              )}
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main style={{ flex: 1, paddingTop: '80px', padding: '80px 20px 20px 20px' }}>
          <div
            style={{
              display: 'flex',
              gap: '12px',
              height: 'calc(100vh - 100px)',
            }}
          >
            {/* Left Sidebar - Steps */}
            <CollapsiblePanel
              title="Build Steps"
              icon={<Zap style={{ width: '14px', height: '14px', color: colors.textMuted }} />}
              isDarkMode={isDarkMode}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%' }}>
                <div style={{ flex: 1, overflow: 'auto' }}>
                  <StepsList
                    steps={steps}
                    currentStep={currentStep}
                    onStepClick={setCurrentStep}
                    isDarkMode={isDarkMode}
                  />
                </div>

                {/* Prompt Input */}
                <div
                  style={{
                    borderRadius: '12px',
                    backgroundColor: isDarkMode ? '#0a0a0a' : '#f4f4f5',
                    border: `1px solid ${colors.border}`,
                    padding: '12px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {(loading || !templateSet) ? (
                    <div style={{ padding: '12px 0', textAlign: 'center' }}>
                      <Loader isDarkMode={isDarkMode} />
                      <p style={{ color: colors.textDim, fontSize: '12px', marginTop: '10px' }}>Processing...</p>
                    </div>
                  ) : (
                    <>
                      <textarea
                        value={userPrompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Ask for modifications..."
                        rows={2}
                        style={{
                          width: '100%',
                          backgroundColor: 'transparent',
                          color: colors.text,
                          fontSize: '13px',
                          lineHeight: '1.5',
                          border: 'none',
                          outline: 'none',
                          resize: 'none',
                          fontFamily: 'inherit',
                          marginBottom: '10px',
                        }}
                      />
                      <button
                        onClick={async () => {
                          const newMessage = { role: "user" as "user", content: userPrompt };
                          setLoading(true);
                          const token = await getToken();
                          const stepsResponse = await axios.post(`${BACKEND_URL}/chat`, {
                            messages: [...llmMessages, newMessage]
                          }, {
                            headers: { Authorization: `Bearer ${token}` }
                          });
                          setLoading(false);
                          setLlmMessages(x => [...x, newMessage]);
                          setLlmMessages(x => [...x, { role: "assistant", content: stepsResponse.data.response }]);
                          setSteps(s => [...s, ...parseXml(stepsResponse.data.response).map(x => ({
                            ...x,
                            status: "pending" as "pending"
                          }))]);
                          setPrompt("");
                        }}
                        disabled={!userPrompt.trim()}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          padding: '10px',
                          borderRadius: '9999px',
                          backgroundColor: userPrompt.trim() ? '#3b82f6' : colors.buttonBg,
                          opacity: userPrompt.trim() ? 1 : 0.5,
                          border: 'none',
                          color: userPrompt.trim() ? 'white' : colors.textMuted,
                          fontSize: '13px',
                          fontWeight: 500,
                          cursor: userPrompt.trim() ? 'pointer' : 'not-allowed',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <Send style={{ width: '14px', height: '14px' }} />
                        <span>Send</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </CollapsiblePanel>

            {/* Files Panel */}
            <CollapsiblePanel
              title="Files"
              icon={<FolderTree style={{ width: '14px', height: '14px', color: colors.textMuted }} />}
              isDarkMode={isDarkMode}
            >
              <FileExplorer files={files} onFileSelect={setSelectedFile} isDarkMode={isDarkMode} />
            </CollapsiblePanel>

            {/* Main Editor/Preview Panel */}
            <div
              style={{
                flex: 1,
                borderRadius: '16px',
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.border}`,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}
            >
              <div
                style={{
                  padding: '14px 16px',
                  borderBottom: `1px solid ${colors.border}`,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <TabView activeTab={activeTab} onTabChange={setActiveTab} isDarkMode={isDarkMode} />
              </div>
              <div style={{ flex: 1, padding: '16px', overflow: 'hidden' }}>
                <div style={{ height: '100%', display: activeTab === 'code' ? 'block' : 'none' }}>
                  <CodeEditor file={selectedFile} isDarkMode={isDarkMode} />
                </div>
                <div style={{ height: '100%', display: activeTab === 'preview' ? 'block' : 'none' }}>
                  <PreviewFrame webContainer={webcontainer} files={files} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

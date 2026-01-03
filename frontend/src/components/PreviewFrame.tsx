import { WebContainer } from '@webcontainer/api';
import { useEffect, useState } from 'react';
import { Loader } from './Loader';

interface PreviewFrameProps {
  webContainer: WebContainer | undefined;
}

export function PreviewFrame({ webContainer }: PreviewFrameProps) {
  const [url, setUrl] = useState("");

  async function main() {
    if (!webContainer) return;

    const installProcess = await webContainer.spawn('npm', ['install']);

    installProcess.output.pipeTo(new WritableStream({
      write(data) {
        console.log(data);
      }
    }));

    await webContainer.spawn('npm', ['run', 'dev']);

    webContainer.on('server-ready', (port, url) => {
      console.log(url)
      console.log(port)
      setUrl(url);
    });
  }

  useEffect(() => {
    main()
  }, [])

  return (
    <div className="h-full flex items-center justify-center rounded-lg overflow-hidden bg-charcoal-900">
      {!url && (
        <div className="text-center space-y-4">
          <Loader />
          <p className="text-gray-400 text-sm">Starting dev server...</p>
        </div>
      )}
      {url && <iframe className="w-full h-full border-0 rounded-lg" src={url} />}
    </div>
  );
}
import { useEffect } from 'react';
export default function YoutubeSubscribe(props) {
  useEffect(() => {
    const youtubescript = document.createElement('script');
    youtubescript.src = 'https://apis.google.com/js/platform.js';
    document.body.appendChild(youtubescript);
    return () => document.body.removeChild(youtubescript);
  }, []);

  return (
    <div
      className='g-ytsubscribe'
      data-layout='full'
      data-count='default'
      data-theme='default'
      data-channel={'DevKeBanNghe'}
      data-channelid={'UCXgD7VBNs4fS3rEcEvlIRVg'}
      {...props}
    ></div>
  );
}

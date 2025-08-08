'use client';

import { useState } from 'react';
import styled from '@emotion/styled';

interface Msg { role: 'user'|'assistant'; content: string }

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: 'assistant', content: '증상 진단 도우미입니다. 증상을 간단히 적어주세요. (예: 2시간 전부터 왼쪽 가슴 통증, 식은땀)' }
  ]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setMsgs((m) => [...m, { role: 'user', content: text }]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: msgs.concat({ role: 'user', content: text }) })
      });
      const data = await res.json();
      const content = data?.content || '응답을 가져오지 못했어요.';
      setMsgs((m) => [...m, { role: 'assistant', content }]);
    } catch (e: any) {
      setMsgs((m) => [...m, { role: 'assistant', content: '오류가 발생했습니다. 잠시 후 다시 시도해주세요.' }]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') send();
  };

  return (
    <Wrap>
      {open && (
        <Panel>
          <Header>
            <strong>증상 진단 AI</strong>
            <button onClick={() => setOpen(false)}>닫기</button>
          </Header>
          <Body>
            {msgs.map((m, i) => (
              <Bubble key={i} role={m.role}>
                {m.content}
              </Bubble>
            ))}
            {loading && <Bubble role="assistant">생각 중...</Bubble>}
          </Body>
          <Footer>
            <Input
              placeholder="증상을 입력하세요"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
            />
            <Send onClick={send} disabled={loading}>전송</Send>
          </Footer>
        </Panel>
      )}
      {!open && <Fab onClick={() => setOpen(true)}>AI</Fab>}
    </Wrap>
  );
}

const Wrap = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 1000;
`;

const Fab = styled.button`
  width: 56px;
  height: 56px;
  background: #111827;
  color: #fff;
  border: 1px solid #111827;
  border-radius: 50%;
  cursor: pointer;
`;

const Panel = styled.div`
  width: 340px;
  height: 420px;
  background: #fff;
  border: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 8px 10px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > button {
    border: 1px solid #e5e7eb;
    background: #f3f4f6;
    padding: 4px 8px;
    border-radius: 0;
    cursor: pointer;
  }
`;

const Body = styled.div`
  flex: 1;
  padding: 10px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Bubble = styled.div<{ role: 'user'|'assistant' }>`
  align-self: ${({ role }) => (role === 'user' ? 'flex-end' : 'flex-start')};
  background: ${({ role }) => (role === 'user' ? '#111827' : '#f3f4f6')};
  color: ${({ role }) => (role === 'user' ? '#fff' : '#111')};
  padding: 8px 10px;
  border-radius: 8px;
  max-width: 80%;
  white-space: pre-wrap;
`;

const Footer = styled.div`
  display: flex;
  gap: 6px;
  padding: 10px;
  border-top: 1px solid #e5e7eb;
`;

const Input = styled.input`
  flex: 1;
  border: 1px solid #e5e7eb;
  padding: 8px 10px;
`;

const Send = styled.button`
  background: #e03a3a;
  color: #fff;
  border: 1px solid #dc2626;
  padding: 8px 12px;
  cursor: pointer;
`;

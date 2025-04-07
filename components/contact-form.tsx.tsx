// app/components/contact-form.tsx
'use client';

import { useFormState } from 'react-dom';
import { sendMessage } from '@/app/actions/contact';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const initialState = {
  message: '',
  errors: null,
  success: false,
};

export function ContactForm() {
  const [state, formAction] = useFormState(sendMessage, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success('Mensagem enviada com sucesso!');
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium">
          Nome
        </label>
        <Input 
          id="name" 
          name="name" 
          placeholder="Seu nome completo" 
          required 
        />
        {state.errors?.name && (
          <p className="text-sm text-red-500">{state.errors.name}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <Input 
          id="email" 
          name="email" 
          type="email" 
          placeholder="seu@email.com" 
          required 
        />
        {state.errors?.email && (
          <p className="text-sm text-red-500">{state.errors.email}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium">
          Mensagem
        </label>
        <Textarea 
          id="message" 
          name="message" 
          rows={5} 
          placeholder="Como posso te ajudar?" 
          required 
        />
        {state.errors?.message && (
          <p className="text-sm text-red-500">{state.errors.message}</p>
        )}
      </div>
      
      <Button type="submit" className="w-full" disabled={state.success}>
        {state.success ? (
          'Enviado!'
        ) : (
          <>
            {state.pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Enviar mensagem
          </>
        )}
      </Button>
    </form>
  );
}
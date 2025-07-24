'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Article } from '@/lib/types';

interface ViewArticleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  article: Article;
}

export function ViewArticleDialog({ open, onOpenChange, article }: ViewArticleDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <div className="mt-2 whitespace-pre-wrap">{article.body}</div>
      </DialogContent>
    </Dialog>
  );
}

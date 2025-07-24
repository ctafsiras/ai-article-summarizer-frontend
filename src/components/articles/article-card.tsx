import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Article } from '@/lib/types';
import { ArrowRight } from 'lucide-react';

export function ArticleCard({ article }: { article: Article }) {
  const shortBody =
    article.body.length > 100 ? `${article.body.substring(0, 100)}...` : article.body;

  return (
    <Link href={`/articles/${article.id}`} className="group">
      <Card className="flex h-full flex-col transition-all group-hover:shadow-lg group-hover:-translate-y-1">
        <CardHeader>
          <CardTitle>{article.title}</CardTitle>
          <div className="flex flex-wrap gap-2 pt-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <CardDescription>{shortBody}</CardDescription>
        </CardContent>
        <CardFooter>
          <div className="flex items-center text-sm font-semibold text-primary">
            Read more <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

interface IArticles {
  id: number;
  title: string;
  contents: string;
}

interface IResponseData {
  result: boolean;
  detail: IArticles[];
}

const DetailAtricles = () => {
  const [articles, setArticles] = useState<IArticles>({
    id: 0,
    title: '',
    contents: '',
  });
  const { id } = useParams();

  useEffect(() => {
    return () => {
      axios
        .get<IResponseData>(`http://localhost:1000/api/articles/${id}/show`)
        .then(function (response) {
          response.data.detail.map((d) => setArticles(d));
        })
        .catch(function (err) {
          alert(err);
        });
    };
  }, []);

  return (
    <div>
      <p>Article ID: {articles.id}</p>
      <p>Article Title: {articles.title}</p>
      <p>Article Content: {articles.contents}</p>
    </div>
  );
};

export default DetailAtricles;

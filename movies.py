#!/usr/bin/env python
import json
import csv

def main():

    titles = set()
    movies = []
    f = 'movie_metadata.csv'
    with open(f, 'rb') as csvfile:
        myreader = csv.reader(csvfile, delimiter=',')
        myreader.next()
        for row in myreader:
            director_name             = row[1]  
            duration                  = row[3]  
            actor_2_name              = row[6]  
            actor_1_name              = row[10] 
            title                     = row[11] 
            language                  = row[19] 
            country                   = row[20] 
            title_year                = row[23] 
            imdb_score                = row[-3] 
            if title:
                title = title[0:-2]
                if title not in titles:
                    titles.add(title)
                    slug = '_'.join(title.lower().split(' '))
                    movies.append({
                        'slug': slug,
                        'director_name': director_name,
                        'duration': duration,
                        'title': title,
                        'actor_1_name': actor_1_name,
                        'actor_2_name': actor_2_name,
                        'language': language,
                        'country': country,
                        'imdb_score': imdb_score,
                        'title_year': title_year
                    })


    movies = sorted(movies, key=lambda k: k['title']) 
    f = 'dist/movies.json'
    with open(f, 'w') as outfile:
        json.dump(movies, outfile)

if __name__ == '__main__':
    main()

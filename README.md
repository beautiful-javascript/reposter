# Reposter

Easily prepare & schedule your social media reposting campaigns.

## For what can I use this tool?

Reposting is a powerful technique to get the most out from the content you've created. If you happen to blog a lot, you can reach more people by reminding them about your content. Reposter is a tool which gets lists of your content (like all articles on your blog), generates the plan for the whole campaign and schedules info on your social media channels, reminding your readers about your content.

## Usage

This application consists of four command-line tools:

* **reposter-fetcher** - responsible for fetching all articles you've even written. You specify your sources (in a form of a _source string_ - read below) & fetcher gets a list of all articles in those sources, including title & URL.
* **reposter-planner** - responsible for planning the reposting campaign in an automatic way. You define size of your campaign and other parameters and planner is trying to figure out the best content from your sources.
* **reposter-presenter** - responsible for preparing reposting items to social channels. You can specify strategies & mix them up to get the best out of every tweet/post on Facebook.
* **reposter-scheduler** - responsible for scheduling the whole campaign on your social channels.

Combined together they create a full solution for automating your reposting campaigns.

## Fetcher

### Usage

To use fetcher you need to give it two arguments:

* `--sources source1 source2...` - a list of sources. It accepts _source strings_ in a format: `parser:fetch_strategy:options`. For example: `sitemap:http:uri=http://yourblog.com/sitemap.xml;method=get` will try to create a list of your articles based on the sitemap of your blog.
* `--out_file file` - an output file where fetcher will store data about your articles. Data is stored in a JSON format. 

### Supported parsers:

Right now there is only one parser - `sitemap`. It accepts one optional parameter: `minPriority`. Specifying it will omit all URIs on page which has priority less than specified value. By default it's `0.8`.

### Supported fetch strategies:

Right now there is only one fetch strategy - `http`. It accepts two **required** parameters: `uri` & `method`. `uri` points to a file that needs to be fetched. `method` is a HTTP verb associated with this resource - for example `get` or `post`.

## Picker

## Presenter

## Scheduler


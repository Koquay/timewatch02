import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-home-blogs",
  templateUrl: "./home-blogs.component.html",
  styleUrls: ["./home-blogs.component.scss"],
})
export class HomeBlogsComponent implements OnInit {
  private blogs;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.getBlogs();
  }

  private getBlogs = () => {
    const blogsSelector = (state) => {
      return state.home.blogs;
    };

    let blogs$ = this.store.select(blogsSelector);

    blogs$.subscribe((blogs) => {
      this.blogs = blogs;
    });
  };
}

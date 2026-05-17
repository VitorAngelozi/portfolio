package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type cta struct {
	Label string `json:"label"`
	Href  string `json:"href"`
}

type profileResponse struct {
	Name     string `json:"name"`
	Headline string `json:"headline"`
	Location string `json:"location"`
	Intro    string `json:"intro"`
	Bio      string `json:"bio"`
	CTA      cta    `json:"cta"`
}

func newRouter() *gin.Engine {
	r := gin.New()
	r.Use(gin.Logger(), gin.Recovery())

	api := r.Group("/api")
	api.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "ok",
			"service": "portfolio-api",
		})
	})

	api.GET("/profile", func(c *gin.Context) {
		c.JSON(http.StatusOK, profileResponse{
			Name:     "Vitor",
			Headline: "Desenvolvedor focado em Go, Node.js e Python",
			Location: "Brasil",
			Intro:    "Olá, meu nome é Vitor.",
			Bio:      "Desenvolvedor independente focado em Go, APIs e sistemas web.",
			CTA: cta{
				Label: "Me contrate",
				Href:  "#contact",
			},
		})
	})

	return r
}

func main() {
	r := newRouter()
	if err := r.Run(":8080"); err != nil {
		panic(err)
	}
}
